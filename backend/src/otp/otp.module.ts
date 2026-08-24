import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entities/otp.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([OtpEntity])
],
  providers: [OtpService],
  exports:[OtpService]
})
export class OtpModule {}
