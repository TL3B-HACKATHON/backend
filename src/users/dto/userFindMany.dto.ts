import { Prisma } from '@prisma/client';
import { PaginationParamsDto } from 'src/common/helper';

export type UserFindManyDto = {
  where?: Prisma.UserWhereInput;
  pagination?: PaginationParamsDto;
  order?:
    | Prisma.UserOrderByWithAggregationInput
    | Array<Prisma.UserOrderByWithAggregationInput>;
};
