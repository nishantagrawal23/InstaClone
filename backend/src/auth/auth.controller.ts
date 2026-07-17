import { Controller, Post, Body, Res, Req  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/Register.dto';
import { VerifyOtpDto } from 'src/otp/dto/verifyOtp.dto';
import type { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 @Post('register')
register(@Body() dto: RegisterDto) {
  return this.authService.create(dto);
}

@Post('verify-otp')
verifyOtp(@Body() dto: VerifyOtpDto) {
  return this.authService.verifyOtp(dto);
}

@Post('login')
async login(
  @Body() loginDto: LoginDto,
  @Res({ passthrough: true }) res: Response,
) {
  const result = await this.authService.login(loginDto);

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    message: result.message,
    accessToken: result.accessToken,
    user: result.user,
  };
}

@Post('refresh')
refresh(
  @Req() req: Request,
) {
  return this.authService.refresh(req);
}



}
