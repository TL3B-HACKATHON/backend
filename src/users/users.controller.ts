import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  PreconditionFailedException,
  Res,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma, Role } from '@prisma/client';
import { Response } from 'express';
import { ExtractCredentials } from 'src/common/decorators';
import { storageConfig } from '../common/storeConfig/storage.config';
import { UsersService } from './users.service';
import { PasswordDto, UserFindManyDto } from './dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  // @Roles(Role.ADMIN)
  @Get()
  findAll(@Query('s') findManyDto: string) {
    let findMany: UserFindManyDto = {};
    if (findManyDto) findMany = JSON.parse(findManyDto);
    return this.usersService.findAll(findMany);
  }

  @Get('current')
  currentUser(@ExtractCredentials('sub') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('current')
  UpdateCurrentUser(
    @ExtractCredentials('sub') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('current/password')
  UpdateCurrentUserPassword(
    @ExtractCredentials('sub') id: string,
    @Body() passwordDto: PasswordDto,
  ) {
    return this.usersService.updatePassword(id, passwordDto);
  }

  @Patch('current/image')
  @UseInterceptors(
    FileInterceptor('image', { storage: storageConfig('USER_PICTURE_PATH') }),
  )
  UpdateCurrentUserWithImage(
    @ExtractCredentials('sub') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new PreconditionFailedException('Picture Was Not Uploaded');
    updateUserDto.picture = file.filename;
    return this.update(id, updateUserDto);
  }

  @Delete('current/image')
  removeCurrentImage(@ExtractCredentials('sub') id: string) {
    return this.usersService.removeImage(id);
  }

  // @Roles(Role.ADMIN,)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', { storage: storageConfig('USER_PICTURE_PATH') }),
  )
  createWithImg(
    @Body() createUserDto: Prisma.UserCreateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new PreconditionFailedException('Picture Was Not Uploaded');
    createUserDto.picture = file.filename;
    return this.create(createUserDto);
  }

  @Patch('image/:id')
  @UseInterceptors(
    FileInterceptor('image', { storage: storageConfig('USER_PICTURE_PATH') }),
  )
  updateWithImage(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new PreconditionFailedException('Picture Was Not Uploaded');
    updateUserDto.picture = file.filename;
    return this.update(id, updateUserDto);
  }

  // @Roles(Role.ADMIN)
  @Delete('image')
  removeFile(@Body() path: { path: string }) {
    return this.usersService.removeFile(path.path);
  }

  @Get('image/:image')
  getUserImage(@Res() res: Response, @Param('image') image: string) {
    const file = this.usersService.getImage(image);
    return file.pipe(res);
  }
}
