import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MailService } from './mail.service';
import { Member } from './member.entity';
import { MemberProfile } from './profile.entity';
import { MemberAddress } from './address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, MemberProfile, MemberAddress])
  ],
  controllers: [MemberController],
  providers: [MemberService, MailService],
  exports: [MemberService],
})
export class MemberModule {}
