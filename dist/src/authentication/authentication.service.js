"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthenticationService = class AuthenticationService {
    constructor(userService, jwtService, configService, httpService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.httpService = httpService;
    }
    async logout(id) {
        await this.userService.update(id, {
            rtH: null,
            rtP: null,
            rtS: null,
        });
    }
    async signIn(signInDto) {
        const user = await this.userService.findByEmail(signInDto.email);
        const passwordCheck = await bcrypt.compare(signInDto.password, user.password);
        if (!passwordCheck)
            throw new common_1.ForbiddenException('Incorrect Password');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async signUp(signUpDto) {
        var data = await this.privateCallAPI({
            firstname: signUpDto.firstname,
            lastname: signUpDto.lastname,
            phone: signUpDto.phone,
            email: signUpDto.email,
            password: signUpDto.password,
            secret: signUpDto.secret,
            role: client_1.Role.PATIENT,
        });
        const createUserDto = {
            firstname: signUpDto.firstname,
            lastname: signUpDto.lastname,
            phone: signUpDto.phone,
            email: signUpDto.email,
            password: signUpDto.password,
            secret: data.data,
            role: client_1.Role.PATIENT,
        };
        const createdUser = await this.userService.create(createUserDto);
        const tokens = await this.getTokens(createdUser.id, createdUser.email);
        await this.updateRefreshToken(createdUser.id, tokens.refresh_token);
        return tokens;
    }
    async refreshTokens(id, rt) {
        const user = await this.userService.findOne(id);
        const hashedRefreshTokenParts = await this._getHashedRefreshTokenParts(id);
        const tokenParts = this._refreshTokenToParts(rt);
        const rtMatches = await this._verifyRefreshToken(tokenParts, hashedRefreshTokenParts);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Invalide Token');
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async updateRefreshToken(id, rt) {
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
    async getTokens(id, email) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: id,
                email,
            }, {
                secret: this.configService.get('AT_SECRET'),
                expiresIn: parseInt(this.configService.get('AT_SECRET_EXPIRATION')),
            }),
            this.jwtService.signAsync({
                sub: id,
                email,
            }, {
                secret: this.configService.get('RT_SECRET'),
                expiresIn: parseInt(this.configService.get('RT_SECRET_EXPIRATION')),
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
    async _getHashedRefreshTokenParts(id) {
        const user = await this.userService._findOne(id);
        if (!user.rtH || !user.rtP || !user.rtS)
            throw new common_1.ForbiddenException('Access Denied');
        return { rtH: user.rtH, rtP: user.rtP, rtS: user.rtS };
    }
    async _verifyRefreshToken(tokens, hashedTokens) {
        const isRtH = await bcrypt.compare(tokens.rtH, hashedTokens.rtH);
        const isRtP = await bcrypt.compare(tokens.rtP, hashedTokens.rtP);
        const isRtS = await bcrypt.compare(tokens.rtS, hashedTokens.rtS);
        return isRtH && isRtP && isRtS;
    }
    _refreshTokenToParts(token) {
        const rtParts = token.split('.');
        return {
            rtH: rtParts[0],
            rtP: rtParts[1],
            rtS: rtParts[2],
        };
    }
    async privateCallAPI(mydata, hash = '') {
        var data = null;
        try {
            data = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://f29d-108-142-127-87.eu.ngrok.io/${hash}`, mydata));
            return data.data;
        }
        catch (error) {
            return null;
        }
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        axios_1.HttpService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map