import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';


@Entity('follows')
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity, (user) => user.following)
  follower!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  following!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

}



