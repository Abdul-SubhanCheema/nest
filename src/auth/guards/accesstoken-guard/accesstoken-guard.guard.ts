import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Observable } from 'rxjs';
import jwtConfig from 'src/Config/jwt.config';
import { Request } from 'express';
import { PAYLOAD_KEY } from 'src/auth/constants/authtype.constant';

@Injectable()
export class AccesstokenGuardGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtconfiguration:ConfigType<typeof jwtConfig>) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
      const token = this.extractrequestfromheader(request);
      if (!token) {
        throw new UnauthorizedException('Access token is missing');
      }
      try {
        const decoded = await this.jwtService.verifyAsync(token, this.jwtconfiguration,
        );
        request[PAYLOAD_KEY] = decoded;
      } catch (error) {
        throw new UnauthorizedException('Invalid access token');
      }

    return true;
  }
  private extractrequestfromheader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
