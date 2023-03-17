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
exports.AutorizationsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const PrismaService_1 = require("../database/PrismaService");
let AutorizationsService = class AutorizationsService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async updateProfessionals(idPat, statusBody) {
        console.log(idPat, statusBody);
        return await this.prisma.autorization.update({
            data: {
                status: statusBody.status,
            },
            where: {
                patientId_professionalID: {
                    patientId: idPat,
                    professionalID: statusBody.idProfessional,
                },
            },
        });
    }
    async create(createAutorizationDto) {
        return await this.prisma.autorization.create({
            data: {
                patientId: createAutorizationDto.patientID,
                professionalID: createAutorizationDto.professionalID,
            },
        });
    }
    async findAll() {
        return await this.prisma.autorization.findMany();
    }
    async getPatients(idPro) {
        return this.prisma.autorization.findMany({
            where: {
                professionalID: idPro,
            },
            include: {
                patient: true,
            },
        });
    }
    async getProfessionals(idPat) {
        return this.prisma.autorization.findMany({
            where: {
                patientId: idPat,
            },
            include: {
                professional: true,
            },
        });
    }
    async update(idPatient, updateUserDto) {
        return await this.prisma.autorization.update({
            data: {
                status: updateUserDto.status,
            },
            where: {
                patientId_professionalID: {
                    patientId: idPatient,
                    professionalID: updateUserDto.idProfessional,
                },
            },
        });
    }
    async remove(idPatient, professionalID) {
        return await this.prisma.autorization.update({
            data: {
                status: client_1.Status.REMOVED,
            },
            where: {
                patientId_professionalID: {
                    patientId: idPatient,
                    professionalID: professionalID,
                },
            },
        });
    }
};
AutorizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService, config_1.ConfigService])
], AutorizationsService);
exports.AutorizationsService = AutorizationsService;
//# sourceMappingURL=autorizations.service.js.map