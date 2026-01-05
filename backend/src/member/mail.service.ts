import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Campus Club! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4F46E5;">Welcome ${name}! 👋</h1>
            <p>Thank you for joining <strong>Campus Club</strong>.</p>
            <p>We're excited to have you as part of our community!</p>
            <br>
            <p>Best regards,<br>Campus Club Team</p>
          </div>
        `,
      });
      console.log('✅ Welcome email sent to:', email);
      return { success: true };
    } catch (error) {
      console.error('❌ Email failed:', error);
      return { success: false, error: error.message };
    }
  }




  









  
  // async sendOTPEmail(email: string, otp: string) {
  //   try {
  //     await this.mailerService.sendMail({
  //       to: email,
  //       subject: 'Your OTP Code - Campus Club',
  //       html: `
  //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //           <h2 style="color: #4F46E5;">Your OTP Code</h2>
  //           <p>Use the following OTP to verify your account:</p>
  //           <h1 style="font-size: 32px; color: #059669; letter-spacing: 8px;">${otp}</h1>
  //           <p>This OTP will expire in 10 minutes.</p>
  //         </div>
  //       `,
  //     });
  //     return { success: true };
  //   } catch (error) {
  //     return { success: false, error: error.message };
  //   }
  // }
}