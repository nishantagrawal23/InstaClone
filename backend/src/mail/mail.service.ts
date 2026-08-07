import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendOtpEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Instagram Clone OTP Verification',

      html: `
        <h2>OTP Verification</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>
      `,
    });
  }

  async sendMessageNotification(
  email: string,
  senderName: string,
) {
  await this.transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: `New message from ${senderName}`,

    html: `
      <h2>New Message</h2>

      <p>
        <strong>${senderName}</strong> sent you a new message.
      </p>

      <p>
        Open the Instagram  app to view and reply.
      </p>
    `,
  });
}
}