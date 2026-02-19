import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class updateCustomerDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
