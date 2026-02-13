import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UpdateUserParamDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
