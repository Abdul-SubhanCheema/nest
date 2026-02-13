import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  Matches,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter and one number',
  })
  @MinLength(8)
  @MaxLength(20)
  password: string;
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
  @IsOptional()
  @IsString()
  role: string;
}
