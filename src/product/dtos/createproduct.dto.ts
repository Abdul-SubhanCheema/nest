import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
  @IsInt()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  description: string;
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => (value instanceof Date ? value : new Date()))
  createdAt: Date = new Date();
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
