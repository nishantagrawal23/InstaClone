import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostEntity } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserModule } from 'src/user/user.module';
import { LikeEntity } from 'src/like/entity/like.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PostEntity,LikeEntity,UserEntity,CommentEntity]),CloudinaryModule,UserModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
