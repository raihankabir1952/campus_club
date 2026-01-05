import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    MemberModule,
    JwtModule.register({
      secret: 'your-super-secret-key-12345',
      signOptions: {expiresIn:'1d'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}