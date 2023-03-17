import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AutorizationsService } from './autorizations.service';
import { ExtractCredentials } from 'src/common/decorators';
import { Prisma, Status } from '@prisma/client';

@Controller('autorizations')
export class AutorizationsController {
  constructor(private readonly autorizationsService: AutorizationsService) {}

  @Post()
  create(
    @Body()
    createAutorizationDto: {
      patientID: string;
      professionalID: string;
    },
  ) {
    // CHECK IF USER EXISTS
    return this.autorizationsService.create(createAutorizationDto);
  }

  @Get('current/patients')
  getPatients(@ExtractCredentials('sub') idPro: string) {
    return this.autorizationsService.getPatients(idPro);
  }

  @Get('current/professionals')
  getProfessionals(@ExtractCredentials('sub') idPat: string) {
    return this.autorizationsService.getProfessionals(idPat);
  }

  @Patch('current/professionals')
  updateProfessionals(
    @ExtractCredentials('sub') idPat: string,
    @Body()
    statusBody: {
      status: Status;
      idProfessional: string;
    },
  ) {
    return this.autorizationsService.updateProfessionals(idPat, statusBody);
  }

  @Delete(':id')
  remove(
    @ExtractCredentials('sub') idPatient: string,
    @Param('id') professionalID: string,
  ) {
    return this.autorizationsService.remove(idPatient, professionalID);
  }
}
