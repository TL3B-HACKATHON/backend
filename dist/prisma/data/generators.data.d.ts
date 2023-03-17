import { Prisma } from '@prisma/client';
export declare const generateUsers: (nbr: number) => Promise<Prisma.UserCreateInput[]>;
