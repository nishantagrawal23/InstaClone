import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ConversationEntity } from './Conversation.entity';

@Entity('conversation_members')
export class ConversationMemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => ConversationEntity,
    (conversation) => conversation.members,
    {
      onDelete: 'CASCADE',
    },
  )
  conversation!: ConversationEntity;

  @ManyToOne(
    () => UserEntity,
    (user) => user.conversations,
    {
      onDelete: 'CASCADE',
    },
  )
  user!: UserEntity;

  @CreateDateColumn()
  joinedAt!: Date;
}