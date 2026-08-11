import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { MailService } from 'src/mail/mail.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly jwtService: JwtService,
    private readonly chatService: ChatService,
    private readonly mailService: MailService,
  ) {}

  @WebSocketServer()
  server!: Server;

  private onlineUsers = new Map<string, Set<string>>();
handleConnection(client: Socket) {
  try {
   

    const token = client.handshake.auth.token;

    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    client.data.userId = payload.id;

    const userId = payload.id;

    if (!this.onlineUsers.has(userId)) {
      this.onlineUsers.set(userId, new Set());
    }

    this.onlineUsers.get(userId)?.add(client.id);

    
  } catch (err) {
    console.error(err);
  }
}

  handleDisconnect(client: Socket) {
    for (const [userId, sockets] of this.onlineUsers.entries()) {
      sockets.delete(client.id);

      if (sockets.size === 0) {
        this.onlineUsers.delete(userId);
      }
    }
  }

  @SubscribeMessage('send_message')
async handleMessage(
  @ConnectedSocket() client: Socket,
  @MessageBody() dto: SendMessageDto,
) {
  const senderId = client.data.userId;

  const savedMessage = await this.chatService.sendMessage(senderId, dto);

  // Send to receiver
  const receiverSockets = this.onlineUsers.get(dto.receiverId);

  if (receiverSockets) {
  // Receiver is online
  receiverSockets.forEach((socketId) => {
    this.server.to(socketId).emit(
      'receive_message',
      savedMessage,
    );
  });
} else {
  // Receiver is offline
  const receiverEmail = await this.chatService.getUserEmail(
    dto.receiverId,
  );

  await this.mailService.sendMessageNotification(
    receiverEmail,
    savedMessage!.sender.name,
  );
}

// Send back to sender
client.emit('receive_message', savedMessage);
  return {
    success: true,
    message: savedMessage,
  };
}
}


