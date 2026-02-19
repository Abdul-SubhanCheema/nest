import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindCustomerDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
