import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dtos/signin.dto';
import { SigninProvider } from './providers/signin.provider';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly signProvider: SigninProvider,
    private readonly refreshTokenProvider: RefreshTokensProvider,
  ) {}

  async SignIn(signInDto: SignInDto) {
    return await this.signProvider.SignIn(signInDto);
  }
  public async RefreshToken(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokenProvider.RefreshToken(refreshTokenDto);
  }
}
