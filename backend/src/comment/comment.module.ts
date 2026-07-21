import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entity/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Module({
  imports:[TypeOrmModule.forFeature([CommentEntity,PostEntity,UpdateCommentDto])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
