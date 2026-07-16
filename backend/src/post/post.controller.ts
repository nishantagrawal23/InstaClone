import { Body, Controller, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGaurd } from 'src/auth/Jwt.auth.guard';
import { type Request } from 'express';
import { Multer } from 'multer';

@Controller('post')
export class PostController {

    constructor(private readonly postservice:PostService){

    }

@Post("create")
@UseGuards(JwtGaurd)
@UseInterceptors(FilesInterceptor('images', 3))
createPost(
  @UploadedFiles() files: Express.Multer.File[],
  @Body() createPostDto: CreatePostDto,@Req() req:Request
) {
  const user=req.user as any
  return this.postservice.create(createPostDto, files,user.sub);
}

    }

