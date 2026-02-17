import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class RemoveCategoryDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
