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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const decorators_1 = require("../common/decorators");
const storage_config_1 = require("../common/storeConfig/storage.config");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll(findManyDto) {
        let findMany = {};
        if (findManyDto)
            findMany = JSON.parse(findManyDto);
        return this.usersService.findAll(findMany);
    }
    currentUser(id) {
        return this.usersService.findOne(id);
    }
    UpdateCurrentUser(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    UpdateCurrentUserPassword(id, passwordDto) {
        return this.usersService.updatePassword(id, passwordDto);
    }
    UpdateCurrentUserWithImage(id, updateUserDto, file) {
        if (!file)
            throw new common_1.PreconditionFailedException('Picture Was Not Uploaded');
        updateUserDto.picture = file.filename;
        return this.update(id, updateUserDto);
    }
    removeCurrentImage(id) {
        return this.usersService.removeImage(id);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
    createWithImg(createUserDto, file) {
        if (!file)
            throw new common_1.PreconditionFailedException('Picture Was Not Uploaded');
        createUserDto.picture = file.filename;
        return this.create(createUserDto);
    }
    updateWithImage(id, updateUserDto, file) {
        if (!file)
            throw new common_1.PreconditionFailedException('Picture Was Not Uploaded');
        updateUserDto.picture = file.filename;
        return this.update(id, updateUserDto);
    }
    removeFile(path) {
        return this.usersService.removeFile(path.path);
    }
    getUserImage(res, image) {
        const file = this.usersService.getImage(image);
        return file.pipe(res);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('s')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('current'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "currentUser", null);
__decorate([
    (0, common_1.Patch)('current'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "UpdateCurrentUser", null);
__decorate([
    (0, common_1.Patch)('current/password'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.PasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "UpdateCurrentUserPassword", null);
__decorate([
    (0, common_1.Patch)('current/image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: (0, storage_config_1.storageConfig)('USER_PICTURE_PATH') })),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "UpdateCurrentUserWithImage", null);
__decorate([
    (0, common_1.Delete)('current/image'),
    __param(0, (0, decorators_1.ExtractCredentials)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeCurrentImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: (0, storage_config_1.storageConfig)('USER_PICTURE_PATH') })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createWithImg", null);
__decorate([
    (0, common_1.Patch)('image/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: (0, storage_config_1.storageConfig)('USER_PICTURE_PATH') })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateWithImage", null);
__decorate([
    (0, common_1.Delete)('image'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeFile", null);
__decorate([
    (0, common_1.Get)('image/:image'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUserImage", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map