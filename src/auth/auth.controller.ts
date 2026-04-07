import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/authtype.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async SignIn(@Body() signInDto: SignInDto) {
    return await this.authService.SignIn(signInDto);
  }
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async RefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.RefreshToken(refreshTokenDto);
  }
}
