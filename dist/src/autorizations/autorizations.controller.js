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
exports.AutorizationsController = void 0;
const common_1 = require("@nestjs/common");
const autorizations_service_1 = require("./autorizations.service");
const decorators_1 = require("../common/decorators");
let AutorizationsController = class AutorizationsController {
    constructor(autorizationsService) {
        this.autorizationsService = autorizationsService;
    }
    create(createAutorizationDto) {
        return this.autorizationsService.create(createAutorizationDto);
    }
    getPatients(idPro) {
        return this.autorizationsService.getPatients(idPro);
    }
    getProfessionals(idPat) {
        return this.autorizationsService.getProfessionals(idPat);
    }
    updateProfessionals(idPat, statusBody) {
        return this.autorizationsService.updateProfessionals(idPat, statusBody);
    }
    remove(idPatient, professionalID) {
        return this.autorizationsService.remove(idPatient, professionalID);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutorizationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('current/patients'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AutorizationsController.prototype, "getPatients", null);
__decorate([
    (0, common_1.Get)('current/professionals'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AutorizationsController.prototype, "getProfessionals", null);
__decorate([
    (0, common_1.Patch)('current/professionals'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AutorizationsController.prototype, "updateProfessionals", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AutorizationsController.prototype, "remove", null);
AutorizationsController = __decorate([
    (0, common_1.Controller)('autorizations'),
    __metadata("design:paramtypes", [autorizations_service_1.AutorizationsService])
], AutorizationsController);
exports.AutorizationsController = AutorizationsController;
//# sourceMappingURL=autorizations.controller.js.map