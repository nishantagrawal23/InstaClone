import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationMemberEntity } from './entity/conversation-member.entity';
import { MessageEntity } from './entity/message.entity';
import { ConversationEntity } from './entity/Conversation.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([ConversationMemberEntity,
    MessageEntity,
    ConversationEntity
    ,UserEntity]),JwtModule.register(
      {secret:`${process.env.JWT_ACCESS_SECRET}`}
    )],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
