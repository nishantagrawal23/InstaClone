import { Injectable, NotFoundException,ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';

import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePostDto } from './dto/createPost.dto';
import { LikeEntity } from 'src/like/entity/like.entity';
import { CommentEntity } from 'src/comment/entity/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}


  async getAllPost(){
    const post= this.postRepository.createQueryBuilder("post")
    .leftJoin(LikeEntity,"like","like.post.id=post.id")
    .leftJoin(CommentEntity,"comment","comment.post.id=post.id")
    .leftJoin(UserEntity,"user","user.id=post.user.id")
    .select(["post.caption","post.images","post.id","post.createdAt",
      "user.name","user.username"])
      .addSelect("COUNT(like.id)","likeCount")
      .addSelect("COUNT(comment.id)","commentCount")
      .groupBy("post.id").addGroupBy("post.caption").addGroupBy("user.username").addGroupBy("user.id")
      .getRawMany()

      return post;
  }
  async create(
    createPostDto: CreatePostDto,
    files: Express.Multer.File[],
    userId: string,
  ) {
    // 1. Check user exists
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

   
    // 2. Upload all images to Cloudinary
const images: { url: string; publicId: string }[] = [];

for (const file of files) {
  const uploadedImage =
    await this.cloudinaryService.uploadImage(file);

  images.push({
    url: uploadedImage.secure_url,
    publicId: uploadedImage.public_id,
  });
}

    // 3. Create post
    const post = this.postRepository.create({
      caption: createPostDto.caption,
      images,
      user,
    });

    // 4. Save post
    return await this.postRepository.save(post);
  }

  async delete(postId: string, userId: string) {

  // Find Post
  const post = await this.postRepository.findOne({
    where: { id: postId },
    relations: {user:true},
  });

  if (!post) {
    throw new NotFoundException('Post not found');
  }

  // Check Ownership
  if (post.user.id !== userId) {
    throw new ForbiddenException(
      'You can delete only your own posts',
    );
  }

  // Delete Images from Cloudinary
  for (const image of post.images) {
    await this.cloudinaryService.deleteImage(image.publicId);
  }

  // Delete Post from Database
  await this.postRepository.remove(post);

  return {
    message: 'Post deleted successfully',
  };
}


}