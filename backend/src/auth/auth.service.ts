import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from 'src/user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { OtpService } from 'src/otp/otp.service';

import { RegisterDto } from './dto/Register.dto';
import { VerifyOtpDto } from 'src/otp/dto/verifyOtp.dto';
import { LoginDto } from './dto/login.dto';

import { type Request ,Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) { }

  async create(createAuthDto: RegisterDto) {
    // Check Email
    const existingEmail = await this.userRepository.findOne({
      where: {
        email: createAuthDto.email,
      },
    });

    if (existingEmail) {
      throw new BadRequestException(
        'User with this email already exists',
      );
    }

    // Check Username
    const existingUsername = await this.userRepository.findOne({
      where: {
        username: createAuthDto.username,
      },
    });

    if (existingUsername) {
      throw new BadRequestException(
        'Username already taken',
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      10,
    );

    // Save User
    const newUser = this.userRepository.create({
      ...createAuthDto,
      password: hashedPassword,
      isVerified: false,
    });

    await this.userRepository.save(newUser);

    // Generate OTP
    const otp = this.otpService.generateOtp();

    // Save OTP
    await this.otpService.saveOtp(
      createAuthDto.email,
      otp,
    );

    // Send OTP
    await this.mailService.sendOtpEmail(
      createAuthDto.email,
      otp,
    );

    return {
      message:
        'Registration successful. Please verify your email using the OTP.',
    };
  }

  // VERIFY OTP ke liye 

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;

    // Verify OTP
    const isValid = await this.otpService.verifyOtp(
      email,
      otp,
    );

    if (!isValid) {
      throw new BadRequestException(
        'Invalid OTP',
      );
    }

    // Find User
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException(
        'User not found',
      );
    }

    // Already Verified
    if (user.isVerified) {
      throw new BadRequestException(
        'User already verified',
      );
    }

    // Verify User
    user.isVerified = true;

    await this.userRepository.save(user);

    // Mark OTP Used
    await this.otpService.markOtpUsed(
      email,
      otp,
    );

    return {
      message: 'Email verified successfully.',
    };
  }
  async generateAccessToken(user: UserEntity) {

    return await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '6d',
      },
    );
  }

  async generateRefreshToken(user: UserEntity) {
    return await this.jwtService.signAsync(
      {
        id: user.id,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );
  }

  async login(loginDto: LoginDto) {

    // 1. Find User
    const user = await this.userRepository.findOne({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    // 2. Check Email Verified
    if (!user.isVerified) {
      throw new BadRequestException(
        'Please verify your email first.',
      );
    }

    // 3. Compare Password
    const isPasswordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException(
        'Invalid email or password',
      );
    }

    // 4. Generate access Tokens calll kr diyaa
    const accessToken = await this.generateAccessToken(user);
   

    // generate refresh token call krr diya 
  
    const refreshToken = await this.generateRefreshToken(user);

    // 5. Hash Refresh Token
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      10,
    );

    // 6. Save Hashed Refresh Token
    user.refreshToken = hashedRefreshToken;

    await this.userRepository.save(user);
 
    
    // 7. Remove Password
    const { password, refreshToken: _, ...userData } = user;
    
    // 8. Return
    return {
      message: 'Login Successful',
      accessToken,
      refreshToken,
      user: userData,
      
    };
  }

async logout(userId: string, res: Response) {
  const user = await this.userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new BadRequestException('User not found');
  }

  // Remove refresh token from database
  user.refreshToken = null;

  await this.userRepository.save(user);

  // Clear refresh token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  }); 

  return {
    message: 'Logout successful',
  };
}

  async refresh(req: Request) {

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Refresh token not found',
      );
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_REFRESH_SECRET,
        },
      );
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired refresh token',
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.refreshToken) {
  throw new UnauthorizedException("Refresh token not found");
}

const isMatched = await bcrypt.compare(
  refreshToken,
  user.refreshToken,
);
    if (!isMatched) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }
    const accessToken =
      await this.generateAccessToken(user);
    return {
      accessToken
    }
  }

}