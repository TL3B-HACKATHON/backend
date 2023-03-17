import { AutorizationsService } from './autorizations.service';
import { Status } from '@prisma/client';
export declare class AutorizationsController {
    private readonly autorizationsService;
    constructor(autorizationsService: AutorizationsService);
    create(createAutorizationDto: {
        patientID: string;
        professionalID: string;
    }): Promise<import(".prisma/client").Autorization>;
    getPatients(idPro: string): Promise<(import(".prisma/client").Autorization & {
        patient: import(".prisma/client").User;
    })[]>;
    getProfessionals(idPat: string): Promise<(import(".prisma/client").Autorization & {
        professional: import(".prisma/client").User;
    })[]>;
    updateProfessionals(idPat: string, statusBody: {
        status: Status;
        idProfessional: string;
    }): Promise<import(".prisma/client").Autorization>;
    remove(idPatient: string, professionalID: string): Promise<import(".prisma/client").Autorization>;
}
