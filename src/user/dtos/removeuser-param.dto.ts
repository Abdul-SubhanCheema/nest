import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class RemoveUserParamDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
