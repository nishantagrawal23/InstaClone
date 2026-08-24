import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from './entities/follow.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }


  async followUser(follower: string, following: string) {
    if (follower === following) {
      throw new BadRequestException("you cant follow yourself")
    }
    const user = await this.userRepository.findOne({
      where: {
        id: following,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const exist = await this.followRepository.findOne({
      where: {
        follower: { id: follower },
        following: { id: following }
      }
    })

    if (exist) {
      throw new ConflictException("already followed")
    }

    const addFollower = this.followRepository.create({
      follower: {
        id: follower
      },
      following: {
        id: following
      },
    })

    await this.followRepository.save(addFollower)

    const followersCount = await this.followRepository.count({
      where: {
        following: {
          id: following,
        },
      },
    });
    return {
      message: "User followed successfully",
      isFollowing: true,
      followersCount,
    }
  }

  async unFollowUser(follower: string, following: string) {
    const findColumn = await this.followRepository.findOne({
      where: {
        follower: {
          id: follower
        },
        following: {
          id: following
        },
      }
    })

    if (!findColumn) {
      throw new NotFoundException("Follow relationship not found")
    }

    await this.followRepository.remove(findColumn)
    const followersCount = await this.followRepository.count({
      where: {
        following: {
          id: following,
        },
      },
    });
    return {
      message: "User unfollowed successfully",
      isFollowing: false,
      followersCount,
    }
  }


}