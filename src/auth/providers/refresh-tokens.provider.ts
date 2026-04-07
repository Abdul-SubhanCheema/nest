import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/Config/jwt.config';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { UserService } from 'src/user/user.service';
import { GenerateTokenProvider } from './generate-token.provider';
import { PickType } from '@nestjs/mapped-types';
import { ActiveUserData } from '../Interfaces/activeuser.interface-data';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private Jwtconfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateRefreshTokenProvider: GenerateTokenProvider,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  public async RefreshToken(refreshTokenDto: RefreshTokenDto) {
    const { id } = await this.jwtService.verifyAsync<
      Pick<ActiveUserData, 'id'>
    >(refreshTokenDto.refreshToken, {
      secret: this.Jwtconfiguration.secret,
      audience: this.Jwtconfiguration.audience,
      issuer: this.Jwtconfiguration.issuer,
    });
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }
    return this.generateRefreshTokenProvider.GenerateToken(user);
  }
}
