import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcrypt';
import { PaginationParamsDto, readFile, removeFile } from 'src/common/helper';
import { ConfigService } from '@nestjs/config';
import { UserFindManyDto, PasswordDto } from './dto';
import { Prisma, User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const userAlreadyExists = await this.prisma.
    user.findFirst({
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
      throw new ConflictException('User Already Exists');
    }

    createUserDto.password = await this.hashData(
      createUserDto.password ||
        createUserDto.firstname + createUserDto.lastname,
    );

    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(findManyDto: UserFindManyDto) {
    const itemsTotal = await this.prisma.user.count({
      where: findManyDto?.where,
    });
    const pageItems = findManyDto?.pagination?.pageItems || 10;
    const pagesCount = Math.ceil(itemsTotal / pageItems);
    const pageIndex = findManyDto?.pagination?.pageIndex || 1;
    const skip = (pageIndex - 1) * pageItems;
    const take = pageItems;

    const users = await this.prisma.user.findMany({
      take,
      skip,
      where: findManyDto?.where,
      orderBy: findManyDto?.order,
    });
    const pagination: PaginationParamsDto = {
      itemsTotal,
      pageIndex,
      pageItems,
      pagesCount,
    };
    return { data: users, pagination };
  }

  async findOne(id: string) {
    const user: Partial<User> = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }
  async _findOne(id: string) {
    const user: Partial<User> = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
  async updatePassword(id: string, passwordDto: PasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    const isMatched = await bcrypt.compare(
      passwordDto.currentPassword,
      user.password,
    );
    if (!isMatched)
      throw new UnauthorizedException('Current Password Is Incorrect');

    return await this.update(id, {
      password: passwordDto.newPassword,
    });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User Not Found');

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
        throw new ConflictException(
          'An User With The Provided Email Already Exists',
        );
      }
    }
    if (user.picture && updateUserDto.picture) {
      if (updateUserDto.picture) {
        await this.removeFile(user.picture);
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashData(
        updateUserDto.password as string,
      );
    }
    return await this.prisma.user.update({
      data: updateUserDto,
      where: { id: id },
    });
  }
  async remove(id: string) {
    const user = await this.findOne(id);
    if (user.picture) {
      await this.removeFile(user.picture);
    }
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  async removeImage(id: string) {
    const user = await this.findOne(id);
    if (user.picture) {
      await removeFile(user.picture);
    }
    return await this.prisma.user.update({
      data: {
        picture: null,
      },
      where: { id: id },
    });
  }

  async removeFile(path: string) {
    return await removeFile(`${this.config.get('USER_PICTURE_PATH')}/${path}`);
  }
  getImage(image: string) {
    return readFile(`${this.config.get('USER_PICTURE_PATH')}/${image}`);
  }
  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }
}
