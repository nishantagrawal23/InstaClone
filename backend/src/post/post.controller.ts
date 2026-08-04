import { Body, Controller, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors,Delete, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/createPost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGaurd } from 'src/auth/Jwt.auth.guard';
import { type Request } from 'express';
import { Multer } from 'multer';



@Controller('post')
export class PostController {

constructor(private readonly postservice:PostService){}

@Get("getallPost")
@UseGuards(JwtGaurd)
getAllPost(@Req() req){
  return this.postservice.getAllPost(req.user.id)
}

@Post("create")
@UseGuards(JwtGaurd)
@UseInterceptors(FilesInterceptor('images', 3))
createPost(
  @UploadedFiles() files: Express.Multer.File[],
  @Body() createPostDto: CreatePostDto,@Req() req:Request
  
) {  

  const user=req.user as any
  return this.postservice.create(createPostDto, files,user.id);
}

@UseGuards(JwtGaurd)
@Get("my-posts")
getMyPosts(@Req() req: Request) {
  const user = req.user as any;
  return this.postservice.getMyPosts(user.id);
}

@UseGuards(JwtGaurd)
@Delete('deletepost')
async deletePost(
  @Body() body :{postId: string},
  @Req() req: Request,
) {
  const user=req.user as any 
  return this.postservice.delete(
    body.postId,
    user.id,
  );
}
    }

