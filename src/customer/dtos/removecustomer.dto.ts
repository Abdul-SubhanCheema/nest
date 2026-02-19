import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class RemoveCustomerDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
