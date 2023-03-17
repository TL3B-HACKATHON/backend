import { ConfigService } from '@nestjs/config';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
export declare class AutorizationsService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    updateProfessionals(idPat: string, statusBody: {
        status: Status;
        idProfessional: string;
    }): Promise<import(".prisma/client").Autorization>;
    create(createAutorizationDto: {
        patientID: string;
        professionalID: string;
    }): Promise<import(".prisma/client").Autorization>;
    findAll(): Promise<import(".prisma/client").Autorization[]>;
    getPatients(idPro: string): Promise<(import(".prisma/client").Autorization & {
        patient: import(".prisma/client").User;
    })[]>;
    getProfessionals(idPat: string): Promise<(import(".prisma/client").Autorization & {
        professional: import(".prisma/client").User;
    })[]>;
    update(idPatient: string, updateUserDto: {
        idProfessional: string;
        status: Status;
    }): Promise<import(".prisma/client").Autorization>;
    remove(idPatient: string, professionalID: string): Promise<import(".prisma/client").Autorization>;
}
