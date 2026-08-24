import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { FollowEntity } from './entities/follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,FollowEntity])],
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule {}
