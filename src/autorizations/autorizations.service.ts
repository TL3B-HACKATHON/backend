import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Status } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class AutorizationsService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async updateProfessionals(
    idPat: string,
    statusBody: { status: Status; idProfessional: string },
  ) {
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

  async create(createAutorizationDto: {
    patientID: string;
    professionalID: string;
  }) {
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

  async getPatients(idPro: string) {
    return this.prisma.autorization.findMany({
      where: {
        professionalID: idPro,
      },
      include: {
        patient: true,
      },
    });
  }

  async getProfessionals(idPat: string) {
    return this.prisma.autorization.findMany({
      where: {
        patientId: idPat,
      },
      include: {
        professional: true,
      },
    });
  }

  async update(
    idPatient: string,
    updateUserDto: {
      idProfessional: string;
      status: Status;
    },
  ) {
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

  async remove(idPatient: string, professionalID: string) {
    return await this.prisma.autorization.update({
      data: {
        status: Status.REMOVED,
      },
      where: {
        patientId_professionalID: {
          patientId: idPatient,
          professionalID: professionalID,
        },
      },
    });
  }
}
