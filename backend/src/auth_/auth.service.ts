import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateMember(email: string, password: string): Promise<any> {
    try {
      const member = await this.memberService.getMemberByEmail(email);
      if (member && await bcrypt.compare(password, member.password)) {
        const { password, ...result } = member;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(loginData: { email: string; password: string }) {
    const member = await this.validateMember(loginData.email, loginData.password);
    if (!member) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: member.email, sub: member.id };
    return {
      access_token: this.jwtService.sign(payload),
      member: {
        id: member.id,
        name: member.name,
        email: member.email
      }
    };
  }
}