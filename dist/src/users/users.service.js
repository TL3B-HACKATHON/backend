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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const PrismaService_1 = require("../database/PrismaService");
const bcrypt = require("bcrypt");
const helper_1 = require("../common/helper");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async create(createUserDto) {
        const userAlreadyExists = await this.prisma.user.findFirst({
            where: {
                email: {
                    equals: createUserDto.email,
                    mode: 'insensitive',
                },
            },
        });
        if (userAlreadyExists) {
            if (createUserDto.picture) {
                await this.removeFile(createUserDto.picture);
            }
            throw new common_1.ConflictException('User Already Exists');
        }
        createUserDto.password = await this.hashData(createUserDto.password ||
            createUserDto.firstname + createUserDto.lastname);
        return await this.prisma.user.create({
            data: createUserDto,
        });
    }
    async findAll(findManyDto) {
        var _a, _b;
        const itemsTotal = await this.prisma.user.count({
            where: findManyDto === null || findManyDto === void 0 ? void 0 : findManyDto.where,
        });
        const pageItems = ((_a = findManyDto === null || findManyDto === void 0 ? void 0 : findManyDto.pagination) === null || _a === void 0 ? void 0 : _a.pageItems) || 10;
        const pagesCount = Math.ceil(itemsTotal / pageItems);
        const pageIndex = ((_b = findManyDto === null || findManyDto === void 0 ? void 0 : findManyDto.pagination) === null || _b === void 0 ? void 0 : _b.pageIndex) || 1;
        const skip = (pageIndex - 1) * pageItems;
        const take = pageItems;
        const users = await this.prisma.user.findMany({
            take,
            skip,
            where: findManyDto === null || findManyDto === void 0 ? void 0 : findManyDto.where,
            orderBy: findManyDto === null || findManyDto === void 0 ? void 0 : findManyDto.order,
        });
        const pagination = {
            itemsTotal,
            pageIndex,
            pageItems,
            pagesCount,
        };
        return { data: users, pagination };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        return user;
    }
    async _findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async updatePassword(id, passwordDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        const isMatched = await bcrypt.compare(passwordDto.currentPassword, user.password);
        if (!isMatched)
            throw new common_1.UnauthorizedException('Current Password Is Incorrect');
        return await this.update(id, {
            password: passwordDto.newPassword,
        });
    }
    async update(id, updateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        if (updateUserDto.email) {
            const emailExists = await this.prisma.user.findFirst({
                where: {
                    email: {
                        equals: updateUserDto.email.toString(),
                        mode: 'insensitive',
                        not: user.email.toString(),
                    },
                },
            });
            if (emailExists) {
                if (updateUserDto.picture) {
                    await this.removeFile(updateUserDto.picture.toString());
                }
                throw new common_1.ConflictException('An User With The Provided Email Already Exists');
            }
        }
        if (user.picture && updateUserDto.picture) {
            if (updateUserDto.picture) {
                await this.removeFile(user.picture);
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await this.hashData(updateUserDto.password);
        }
        return await this.prisma.user.update({
            data: updateUserDto,
            where: { id: id },
        });
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (user.picture) {
            await this.removeFile(user.picture);
        }
        return await this.prisma.user.delete({
            where: { id },
        });
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive',
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User Not Found');
        return user;
    }
    async removeImage(id) {
        const user = await this.findOne(id);
        if (user.picture) {
            await (0, helper_1.removeFile)(user.picture);
        }
        return await this.prisma.user.update({
            data: {
                picture: null,
            },
            where: { id: id },
        });
    }
    async removeFile(path) {
        return await (0, helper_1.removeFile)(`${this.config.get('USER_PICTURE_PATH')}/${path}`);
    }
    getImage(image) {
        return (0, helper_1.readFile)(`${this.config.get('USER_PICTURE_PATH')}/${image}`);
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [PrismaService_1.PrismaService, config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map