import { PostEntity } from 'src/post/entities/post.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FollowEntity } from 'src/follow/entities/follow.entity';

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
followers: FollowEntity[];

@OneToMany(() => FollowEntity, (follow) => follow.follower)
following: FollowEntity[];
}