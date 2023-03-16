import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ExtractCredentials, Public } from 'src/common/decorators';
import { RtGaurd } from 'src/common/guards';
import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.signIn(signInDto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @Post('logout')
  async logout(@ExtractCredentials('sub') id: string) {
    return this.authenticationService.logout(id);
  }

  @Public()
  @UseGuards(RtGaurd)
  @Post('refresh')
  async refresh(
    @ExtractCredentials('sub') id: string,
    @ExtractCredentials('refreshToken') refreshToken: string,
  ) {
    console.log(id, refreshToken);
    return this.authenticationService.refreshTokens(id, refreshToken);
  }
}
