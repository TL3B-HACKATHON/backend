/// <reference types="node" />
import { PrismaService } from 'src/database/PrismaService';
import { PaginationParamsDto } from 'src/common/helper';
import { ConfigService } from '@nestjs/config';
import { UserFindManyDto, PasswordDto } from './dto';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(createUserDto: Prisma.UserCreateInput): Promise<User>;
    findAll(findManyDto: UserFindManyDto): Promise<{
        data: User[];
        pagination: PaginationParamsDto;
    }>;
    findOne(id: string): Promise<Partial<User>>;
    _findOne(id: string): Promise<Partial<User>>;
    updatePassword(id: string, passwordDto: PasswordDto): Promise<User>;
    update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<User>;
    remove(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    removeImage(id: string): Promise<User>;
    removeFile(path: string): Promise<{
        message: string;
    }>;
    getImage(image: string): import("fs").ReadStream;
    hashData(data: string): Promise<string>;
}
