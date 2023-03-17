import { AuthenticationService } from './authentication.service';
import { SignInDto, SignUpDto } from './dto';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    signIn(signInDto: SignInDto): Promise<import("./types").Tokens>;
    signUp(signUpDto: SignUpDto): Promise<import("./types").Tokens>;
    logout(id: string): Promise<void>;
    refresh(id: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
