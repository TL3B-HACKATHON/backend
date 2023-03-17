import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role, User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenParts, SignInDto, SignUpDto } from './dto';
import { Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async logout(id: string) {
    await this.userService.update(id, {
      rtH: null,
      rtP: null,
      rtS: null,
    });
  }

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(signInDto.email);
    const passwordCheck = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!passwordCheck) throw new ForbiddenException('Incorrect Password');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUp(signUpDto: SignUpDto): Promise<Tokens> {
    var data = await this.privateCallAPI({
      firstname: signUpDto.firstname,
      lastname: signUpDto.lastname,
      phone: signUpDto.phone,
      email: signUpDto.email,
      password: signUpDto.password,
      secret: signUpDto.secret,
      role: Role.PATIENT,
    });

    const createUserDto: Prisma.UserCreateInput = {
      firstname: signUpDto.firstname,
      lastname: signUpDto.lastname,
      phone: signUpDto.phone,
      email: signUpDto.email,
      password: signUpDto.password,
      secret: data.data,
      role: Role.PATIENT,
    };

    const createdUser: Partial<User> = await this.userService.create(
      createUserDto,
    );

    const tokens = await this.getTokens(createdUser.id, createdUser.email);

    await this.updateRefreshToken(createdUser.id, tokens.refresh_token);

    return tokens;
  }
  async refreshTokens(id: string, rt: string) {
    const user = await this.userService.findOne(id);

    const hashedRefreshTokenParts = await this._getHashedRefreshTokenParts(id);
    const tokenParts = this._refreshTokenToParts(rt);

    const rtMatches = await this._verifyRefreshToken(
      tokenParts,
      hashedRefreshTokenParts,
    );

    if (!rtMatches) throw new ForbiddenException('Invalide Token');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRefreshToken(id: string, rt: string) {
    const rts = this._refreshTokenToParts(rt);
    rts.rtH = await this.userService.hashData(rts.rtH);
    rts.rtP = await this.userService.hashData(rts.rtP);
    rts.rtS = await this.userService.hashData(rts.rtS);
    await this.userService.update(id, {
      rtH: rts.rtH,
      rtP: rts.rtP,
      rtS: rts.rtS,
    });
  }

  async getTokens(id: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get('AT_SECRET'),
          expiresIn: parseInt(this.configService.get('AT_SECRET_EXPIRATION')),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get('RT_SECRET'),
          expiresIn: parseInt(this.configService.get('RT_SECRET_EXPIRATION')),
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async _getHashedRefreshTokenParts(id: string): Promise<RefreshTokenParts> {
    const user = await this.userService._findOne(id);
    if (!user.rtH || !user.rtP || !user.rtS)
      throw new ForbiddenException('Access Denied');
    return { rtH: user.rtH, rtP: user.rtP, rtS: user.rtS };
  }
  async _verifyRefreshToken(
    tokens: RefreshTokenParts,
    hashedTokens: RefreshTokenParts,
  ) {
    const isRtH = await bcrypt.compare(tokens.rtH, hashedTokens.rtH);
    const isRtP = await bcrypt.compare(tokens.rtP, hashedTokens.rtP);
    const isRtS = await bcrypt.compare(tokens.rtS, hashedTokens.rtS);
    return isRtH && isRtP && isRtS;
  }
  _refreshTokenToParts(token: string): RefreshTokenParts {
    const rtParts = token.split('.');
    return {
      rtH: rtParts[0],
      rtP: rtParts[1],
      rtS: rtParts[2],
    };
  }

  async privateCallAPI(mydata, hash: string = '') {
    var data = null;
    try {
      data = await firstValueFrom(
        this.httpService.post(
          `https://f29d-108-142-127-87.eu.ngrok.io/${hash}`,
          mydata,
        ),
      );
      return data.data;
    } catch (error) {
      return null;
    }
  }
}
