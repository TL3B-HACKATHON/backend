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
exports.BlockchainService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let BlockchainService = class BlockchainService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async create(data) {
        return 'This action adds a new blockchain';
    }
    async findAll() {
        return `This action returns all blockchain`;
    }
    async find(hash) {
        return `This action returns a blockchain`;
    }
    async update(hash, data) {
        return `This action updates a blockchain`;
    }
    async remove(id) {
        return `This action removes a blockchain`;
    }
};
BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], BlockchainService);
exports.BlockchainService = BlockchainService;
//# sourceMappingURL=blockchain.service.js.map