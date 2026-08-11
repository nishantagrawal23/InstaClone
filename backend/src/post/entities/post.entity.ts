import { CommentEntity } from "src/comment/entity/comment.entity";
import { LikeEntity } from "src/like/entity/like.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('posts')
export class PostEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  caption!: string;

@Column({
  type: 'jsonb',
})
images!: {
  url: string;
  publicId: string;
}[];
  @ManyToOne(
  () => UserEntity,
  (user) => user.posts,
)
   user!: UserEntity;

@OneToMany(() => LikeEntity, (like) => like.post)
likes!: LikeEntity[];

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
comments!: CommentEntity[];
  

}