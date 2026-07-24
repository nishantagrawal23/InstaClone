import { PostEntity } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

// this is for posts 

  @OneToMany(
    () => PostEntity,
    (post) => post.user,
  )
  posts!: PostEntity[];


  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({
    nullable: true,
  })
  refreshToken!: string;


  // ye ho gya apna follower relaton
@OneToMany(() => FollowEntity, (follow) => follow.following)
followers!: FollowEntity[];

@OneToMany(() => FollowEntity, (follow) => follow.follower)
following!: FollowEntity[];

// for like 
@OneToMany(() => LikeEntity, (like) => like.user)
likes!: LikeEntity[];

// for comment 

@OneToMany(() => CommentEntity, (comment) => comment.user)
comments!: CommentEntity[];

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
}