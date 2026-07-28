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
  ) {}

  @WebSocketServer()
  server!: Server;

  private onlineUsers = new Map<string, Set<string>>();

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.auth as string;

      if (!token) {
        return client.disconnect();
      }

      const payload = this.jwtService.verify(token, {
        secret: `${process.env.JWT_ACCESS_SECRET}`,
      });

      // Without storing userId in client.data, handleMessage() won't know which authenticated
      // user sent the message.
      client.data.userId = payload.id;

      const userId = payload.id;

      if (!this.onlineUsers.has(userId)) {
        this.onlineUsers.set(userId, new Set());
      }

      this.onlineUsers.get(userId)?.add(client.id);
    } catch (error) {
      console.error(error);
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

    const receiverSockets = this.onlineUsers.get(dto.receiverId);

    if (receiverSockets) {
      receiverSockets.forEach((socketId) => {
        this.server.to(socketId).emit('receive_message', savedMessage);
      });
    }

    return {
      success: true,
      message: savedMessage,
    };
  }
}

// 18a28d79-2583-4e37-b7b4-1a84bc1c2cf9
