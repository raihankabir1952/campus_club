import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //if token expair then not work.
      secretOrKey: 'your-super-secret-key-12345',//secret key means server side key to verify token.
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.sub, 
      email: payload.email 
    };
  }
}
//token verify
//token verify rules
//http request theke token ber kore