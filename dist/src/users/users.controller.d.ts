/// <reference types="multer" />
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { UsersService } from './users.service';
import { PasswordDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: Prisma.UserCreateInput): Promise<import(".prisma/client").User>;
    findAll(findManyDto: string): Promise<{
        data: import(".prisma/client").User[];
        pagination: import("../common/helper").PaginationParamsDto;
    }>;
    currentUser(id: string): Promise<Partial<import(".prisma/client").User>>;
    UpdateCurrentUser(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<import(".prisma/client").User>;
    UpdateCurrentUserPassword(id: string, passwordDto: PasswordDto): Promise<import(".prisma/client").User>;
    UpdateCurrentUserWithImage(id: string, updateUserDto: Prisma.UserUpdateInput, file: Express.Multer.File): Promise<import(".prisma/client").User>;
    removeCurrentImage(id: string): Promise<import(".prisma/client").User>;
    findOne(id: string): Promise<Partial<import(".prisma/client").User>>;
    update(id: string, updateUserDto: Prisma.UserUpdateInput): Promise<import(".prisma/client").User>;
    remove(id: string): Promise<import(".prisma/client").User>;
    createWithImg(createUserDto: Prisma.UserCreateInput, file: Express.Multer.File): Promise<import(".prisma/client").User>;
    updateWithImage(id: string, updateUserDto: Prisma.UserUpdateInput, file: Express.Multer.File): Promise<import(".prisma/client").User>;
    removeFile(path: {
        path: string;
    }): Promise<{
        message: string;
    }>;
    getUserImage(res: Response, image: string): Response<any, Record<string, any>>;
}
