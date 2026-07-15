import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpEntity } from './entities/otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
  ) {}

  // Generate 6 Digit OTP
  generateOtp(): string {
    return Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
  }

  // Save OTP
  async saveOtp(
    email: string,
    otp: string,
  ): Promise<OtpEntity> {
    // Purane active OTP ko invalidate kar do
    await this.otpRepository.update(
      {
        email,
        isUsed: false,
      },
      {
        isUsed: true,
      },
    );

    const otpEntity = this.otpRepository.create({
      email,
      otp,
      expiresAt: new Date(
        Date.now() + 5 * 60 * 1000,
      ),
      isUsed: false,
    });

    return await this.otpRepository.save(
      otpEntity,
    );
  }

  // Verify OTP
  async verifyOtp(
    email: string,
    otp: string,
  ): Promise<boolean> {
    const otpRecord =
      await this.otpRepository.findOne({
        where: {
          email,
          otp,
        },
      });

    if (!otpRecord) {
      throw new BadRequestException(
        'Invalid OTP',
      );
    }

    if (otpRecord.isUsed) {
      throw new BadRequestException(
        'OTP already used',
      );
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException(
        'OTP expired',
      );
    }

    return true;
  }

  // Mark OTP Used
  async markOtpUsed(
    email: string,
    otp: string,
  ): Promise<void> {
    await this.otpRepository.update(
      {
        email,
        otp,
      },
      {
        isUsed: true,
      },
    );
  }
}