import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatecategoryDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
