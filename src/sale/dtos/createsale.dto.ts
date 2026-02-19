import { IsInt, IsNotEmpty } from 'class-validator';

export class createsaleDto {
  @IsInt()
  @IsNotEmpty()
  totalAmount: number;
  @IsInt()
  @IsNotEmpty()
  taxAmount: number;
  @IsInt()
  @IsNotEmpty()
  discountAmount: number;
  @IsInt()
  @IsNotEmpty()
  netAmount: number;
}
