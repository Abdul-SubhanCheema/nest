import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SigninProvider } from './providers/signin.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/Config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccesstokenGuardGuard } from './guards/accesstoken-guard/accesstoken-guard.guard';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthenticationController } from './social/google-authentication.controller.controller';
import { GoogleAuthentication } from './social/providers/google-authentication';


@Module({
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SigninProvider,
    AccesstokenGuardGuard,
    GenerateTokenProvider,
    RefreshTokensProvider,
    GoogleAuthentication,
  ],
  imports: [forwardRef(() => UserModule), ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider())],
  exports: [AuthService, HashingProvider, JwtModule, AccesstokenGuardGuard],
})
export class AuthModule {}
