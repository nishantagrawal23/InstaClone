import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Create User
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException(
        'User with this email already exists',
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Get All Users
  async findAll() {
    return await this.userRepository.find();
  }

  // Get Single User
  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // ye to update user ke liye 
  async update(id: string, updateUserDto: UpdateUserDto) {

    // yaha to user check kiya kiya ki user exist karta hai ya nahi
    const user = await this.findOne(id);

    // Email duplicate check karne ke liye 
    if (
      updateUserDto.email &&
      updateUserDto.email !== user.email
    ) {
      
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'User with this email already exists',
        );
      }
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  // Delete User
  async remove(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}