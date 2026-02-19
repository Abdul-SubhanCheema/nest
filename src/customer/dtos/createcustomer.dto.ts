import { IsNotEmpty, IsString } from 'class-validator';

export class createCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  phoneNo: string;
}
