import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth_/auth.module';  
import { Member } from './member/member.entity';
import { MemberProfile } from './member/profile.entity';  
import { MemberAddress } from './member/address.entity'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'raihankabir1952@gmail.com',
          pass: 'unzl zduj npiu lriv',

        },
      },
      defaults: {
        from: '"Campus Club" <${process.env.EMAIL_USER}>',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASS || 'raihan1952',
      database: process.env.DATABASE_NAME || 'campus_club_management',
      entities: [Member, MemberProfile, MemberAddress],
      synchronize: true,
    }),
    MemberModule,
    AuthModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}