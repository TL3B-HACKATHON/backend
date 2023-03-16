import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('RT_SECRET'),
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: any) {
    const refresh_token = req.get('authorization').replace('Bearer', '').trim();

    return {
      ...payload,
      refreshToken: refresh_token,
    };
  }
}
