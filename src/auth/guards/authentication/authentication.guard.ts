import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccesstokenGuardGuard } from '../accesstoken-guard/accesstoken-guard.guard';
import { Reflector } from '@nestjs/core';
import { AuthType } from 'src/auth/enums/authtype.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/authtype.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authtypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;

  constructor(
    private readonly acessTokenGuard: AccesstokenGuardGuard,
    private readonly reflector: Reflector,
  ) {
    this.authtypeGuardMap = {
      [AuthType.Bearer]: this.acessTokenGuard,
      [AuthType.None]: {
        canActivate: () => true,
      },
    };
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];
    const guards = authTypes.map((type) => this.authtypeGuardMap[type].flat());

    const error = new UnauthorizedException();

    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
