import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailModule } from 'src/mail/mail.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([UserEntity]),

    MailModule,

    OtpModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRET'),

        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService],

  exports: [JwtModule],
})
export class AuthModule {}