import { PostEntity } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FollowEntity } from 'src/follow/entities/follow.entity';
import { LikeEntity } from 'src/like/entity/like.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';
import { ConversationMemberEntity } from 'src/chat/entity/conversation-member.entity';
import { MessageEntity } from 'src/chat/entity/message.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isVerified!: boolean;

  // Profile Information

 @Column({
  type: 'text',
  nullable: true,
})
bio!: string | null;

@Column({
  type: 'text',
  nullable: true,
})
profilePicture!: string | null;

@Column({
  type: 'text',
  nullable: true,
})
profilePicturePublicId!: string | null;

@Column({
  type: 'text',
  nullable: true,
})
refreshToken!: string | null;
  // Posts

  @OneToMany(
    () => PostEntity,
    (post) => post.user,
  )
  posts!: PostEntity[];

  // Followers

  @OneToMany(
    () => FollowEntity,
    (follow) => follow.following,
  )
  followers!: FollowEntity[];

  @OneToMany(
    () => FollowEntity,
    (follow) => follow.follower,
  )
  following!: FollowEntity[];

  // Likes

  @OneToMany(
    () => LikeEntity,
    (like) => like.user,
  )
  likes!: LikeEntity[];

  // Comments

  @OneToMany(
    () => CommentEntity,
    (comment) => comment.user,
  )
  comments!: CommentEntity[];

  // Chats

  @OneToMany(
    () => ConversationMemberEntity,
    (member) => member.user,
  )
  conversations!: ConversationMemberEntity[];

  @OneToMany(
    () => MessageEntity,
    (message) => message.sender,
  )
  messages!: MessageEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}