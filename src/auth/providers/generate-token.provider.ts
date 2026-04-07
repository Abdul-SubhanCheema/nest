import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/Config/jwt.config';
import { User } from 'src/user/entity/user.entity';
import { ActiveUserData } from '../Interfaces/activeuser.interface-data';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private Jwtconfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async SignToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        ...payload,
        sub: userId,
      },
      {
        secret: this.Jwtconfiguration.secret,
        expiresIn: expiresIn,
        audience: this.Jwtconfiguration.audience,
        issuer: this.Jwtconfiguration.issuer,
      },
    );
  }
  public async GenerateToken(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.SignToken<Partial<ActiveUserData>>(
        user.id,
        this.Jwtconfiguration.accessTokenTtl,
        { username: user.username },
      ),
      this.SignToken<Partial<ActiveUserData>>(
        user.id,
        this.Jwtconfiguration.refreshTokenTtl,
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
