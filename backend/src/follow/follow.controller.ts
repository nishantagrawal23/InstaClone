import { Controller, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtGaurd } from 'src/auth/Jwt.auth.guard';

@Controller('follow')
export class FollowController {
  
    constructor( 
        private readonly followservice:FollowService
    ){}

@Post(':userId')
@UseGuards(JwtGaurd)
followUser(
  @Req() req,
  @Param('userId') userId: string,
) {
  return this.followservice.followUser(req.user.id, userId);
}

@Post('unfollow/:userId')
@UseGuards(JwtGaurd)
unFollowUser(
    
  @Req() req,
  @Param('userId') userId: string,
) {
  return this.followservice.unFollowUser(req.user.id, userId);
}

}
