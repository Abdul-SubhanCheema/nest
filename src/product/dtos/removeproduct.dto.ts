import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class RemoveProductDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
