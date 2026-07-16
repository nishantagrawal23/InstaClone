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

  @Column('text',{array:true,
    nullable: true,
  })
  imageUrl!: string[];

  @ManyToOne(
  () => UserEntity,
  (user) => user.posts,
)
   user!: UserEntity;


  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  

}