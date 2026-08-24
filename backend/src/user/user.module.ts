import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserEntity } from './entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { FollowEntity } from 'src/follow/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,PostEntity,FollowEntity]),CloudinaryModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule]
})
export class UserModule {}
