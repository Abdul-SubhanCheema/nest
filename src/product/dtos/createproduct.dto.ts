import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsBoolean()
  IsActive: boolean;
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
