import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class FindProductDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
