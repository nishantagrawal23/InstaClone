import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtGaurd } from 'src/auth/Jwt.auth.guard';
import { type  Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}


  @Post(':postId')
  @UseGuards(JwtGaurd)
  createLike(@Param("postId")  postId:string,@Req() req:Request){
    const user= req.user as any 
    return this.likeService.toggleLike(postId,user.id)
  }



}
