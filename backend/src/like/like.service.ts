import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LikeEntity } from './entity/like.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly LikeEntity: Repository<LikeEntity>,

    @InjectRepository(PostEntity)
    private readonly PostEntity: Repository<PostEntity>,
  ) {}

  async toggleLike(postId: string, userId: string) {
    // 1. Check post exists
    const post = await this.PostEntity.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // 2. Check if already liked
    const existingLike = await this.LikeEntity.findOne({
      where: {
        post: { id: postId },
        user: { id: userId },
      },

    });

    // 3. Unlike
    if (existingLike) {
      await this.LikeEntity.remove(existingLike);

      const likesCount = await this.LikeEntity.count({
        where: {
          post: { id: postId },
        },
      });

      return {
        liked: false,
        likesCount,
      };
    }

    // 4. Like
    const like = this.LikeEntity.create({
      post: { id: postId },
      user: { id: userId },
    });

    await this.LikeEntity.save(like);

    const likesCount = await this.LikeEntity.count({
      where: {
        post: { id: postId },
      },
    });

    return {
      liked: true,
      likesCount,
    };
  }
}