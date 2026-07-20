import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entity/like.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entitiy';

@Module({
  imports:[TypeOrmModule.forFeature([LikeEntity,UserEntity,PostEntity])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
