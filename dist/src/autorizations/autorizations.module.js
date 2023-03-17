"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorizationsModule = void 0;
const common_1 = require("@nestjs/common");
const autorizations_service_1 = require("./autorizations.service");
const autorizations_controller_1 = require("./autorizations.controller");
const PrismaService_1 = require("../database/PrismaService");
let AutorizationsModule = class AutorizationsModule {
};
AutorizationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [autorizations_controller_1.AutorizationsController],
        providers: [autorizations_service_1.AutorizationsService, PrismaService_1.PrismaService],
    })
], AutorizationsModule);
exports.AutorizationsModule = AutorizationsModule;
//# sourceMappingURL=autorizations.module.js.map