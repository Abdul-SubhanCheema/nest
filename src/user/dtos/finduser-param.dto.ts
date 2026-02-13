import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindUserParamDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
