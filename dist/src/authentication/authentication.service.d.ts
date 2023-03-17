import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenParts, SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class AuthenticationService {
    private userService;
    private jwtService;
    private configService;
    private httpService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService, httpService: HttpService);
    logout(id: string): Promise<void>;
    signIn(signInDto: SignInDto): Promise<Tokens>;
    signUp(signUpDto: SignUpDto): Promise<Tokens>;
    refreshTokens(id: string, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRefreshToken(id: string, rt: string): Promise<void>;
    getTokens(id: string, email: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    _getHashedRefreshTokenParts(id: string): Promise<RefreshTokenParts>;
    _verifyRefreshToken(tokens: RefreshTokenParts, hashedTokens: RefreshTokenParts): Promise<boolean>;
    _refreshTokenToParts(token: string): RefreshTokenParts;
    privateCallAPI(mydata: any, hash?: string): Promise<any>;
}
