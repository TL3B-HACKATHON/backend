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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const users_service_1 = require("../../users/users.service");
const bcrypt = require("bcrypt");
let RolesGuard = class RolesGuard {
    constructor(reflector, config, userService) {
        this.reflector = reflector;
        this.config = config;
        this.userService = userService;
    }
    async canActivate(context) {
        const roles = await this.reflector.getAllAndOverride(this.config.get('ROLES_KEY'), [context.getHandler(), context.getClass()]);
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const id = request.user.sub;
        const user = await this.userService.findOne(id);
        console.log('user', user);
        const booledRoles = await Promise.all(roles.map((role) => bcrypt.compare(user.role, role)));
        const isPermeted = booledRoles.includes(true);
        if (!isPermeted) {
            throw new common_1.ForbiddenException("You don't have permissions to access this ressource");
        }
        return true;
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(users_service_1.UsersService)),
    __metadata("design:paramtypes", [core_1.Reflector,
        config_1.ConfigService,
        users_service_1.UsersService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=role.guard.js.map