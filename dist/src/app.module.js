"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const guards_1 = require("./common/guards");
const PrismaService_1 = require("./database/PrismaService");
const users_service_1 = require("./users/users.service");
const users_module_1 = require("./users/users.module");
const authentication_module_1 = require("./authentication/authentication.module");
const autorizations_module_1 = require("./autorizations/autorizations.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                cache: true,
                isGlobal: true,
            }),
            users_module_1.UsersModule,
            authentication_module_1.AuthenticationModule,
            autorizations_module_1.AutorizationsModule,
        ],
        controllers: [],
        providers: [
            users_service_1.UsersService,
            PrismaService_1.PrismaService,
            { provide: core_1.APP_GUARD, useClass: guards_1.AtGaurd },
            { provide: core_1.APP_GUARD, useClass: guards_1.RolesGuard },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map