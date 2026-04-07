import { SetMetadata } from '@nestjs/common';
import { AuthType } from '../enums/authtype.enum';
import { AUTH_TYPE_KEY } from '../constants/authtype.constant';
export const Auth = (...authTypes: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, authTypes);
