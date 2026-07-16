import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';


import { PostEntity } from './entities/post.entitiy';
import { UserEntity } from 'src/user/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
    const imageUrls: string[] = [];

    for (const file of files) {
      const uploadedImage =
        await this.cloudinaryService.uploadImage(file);

      imageUrls.push(uploadedImage.secure_url);
    }

    // 3. Create post
    const post = this.postRepository.create({
      caption: createPostDto.caption,
      imageUrl: imageUrls,
      user,
    });

    // 4. Save post
    return await this.postRepository.save(post);
  }
}