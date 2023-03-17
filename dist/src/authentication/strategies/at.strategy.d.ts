import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare type JwtPayload = {
    sub: string;
    email: string;
};
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    private config;
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};
