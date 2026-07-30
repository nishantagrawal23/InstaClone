import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversationEntity } from './Conversation.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('messages')
export class MessageEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;
    @ManyToOne(
        () => ConversationEntity,
        (conversation) => conversation.messages,
        {
            onDelete: 'CASCADE',
        },
    )

    conversation!: ConversationEntity;
    @ManyToOne(
        () => UserEntity,
        (user) => user.messages,
        {
            onDelete: 'CASCADE',
        },
    )
    sender!: UserEntity;

    @Column('text')
    message!: string;

    @Column({
        default: false,
    })
    isSeen!: boolean;
    @CreateDateColumn()
    createdAt!: Date;
}