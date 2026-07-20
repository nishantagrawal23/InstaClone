import { PostEntity } from "src/post/entities/post.entitiy";
import { UserEntity } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity('likes')
@Unique(['user', 'post'])
export class LikeEntity{
@PrimaryGeneratedColumn('uuid')
id!: string;

@ManyToOne(() => PostEntity, (post) => post.likes,{
  onDelete: 'CASCADE',})
post!: PostEntity;

@ManyToOne(() => UserEntity, (user) => user.likes,
{
  onDelete: 'CASCADE',})
user!: UserEntity;


  @CreateDateColumn()
  createdAt!: Date;



}

