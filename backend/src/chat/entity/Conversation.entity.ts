import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationMemberEntity } from './conversation-member.entity';
import { MessageEntity } from './message.entity';

@Entity('conversations')
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: ['DIRECT', 'GROUP'],
    default: 'DIRECT',
  })
  type!: 'DIRECT' | 'GROUP';

  @Column({ nullable: true })
  lastMessage!: string;

  @Column({ type: 'timestamp', nullable: true })
  lastMessageAt!: Date;

  @OneToMany(
    () => ConversationMemberEntity,
    (member) => member.conversation,
  )
  members!: ConversationMemberEntity[];

  @OneToMany(
    () => MessageEntity,
    (message) => message.conversation,
  )
  messages!: MessageEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}