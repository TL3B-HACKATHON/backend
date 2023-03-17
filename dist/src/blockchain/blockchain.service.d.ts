import { HttpService } from '@nestjs/axios';
export declare class BlockchainService {
    private readonly httpService;
    constructor(httpService: HttpService);
    create(data: string): Promise<string>;
    findAll(): Promise<string>;
    find(hash: string): Promise<string>;
    update(hash: string, data: any): Promise<string>;
    remove(id: number): Promise<string>;
}
