import { forwardRef, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/Config/jwt.config';
import { In } from 'typeorm';
import { GoogleAuthDto } from '../dtos/google-auth.dto';
import { UserService } from 'src/user/user.service';
import { GenerateTokenProvider } from 'src/auth/providers/generate-token.provider';

@Injectable()
export class GoogleAuthentication implements OnModuleInit {
  private authclient: OAuth2Client | undefined;
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userservice: UserService,
    @Inject(jwtConfig.KEY)
    private readonly jwtconfig: ConfigType<typeof jwtConfig>,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}
  onModuleInit() {
    const clientId = this.jwtconfig.googleClientId;
    const clientSecret = this.jwtconfig.googleClientSecret;
    this.authclient = new OAuth2Client(clientId, clientSecret);
  }
  public async authenticate(googleAuthDto: GoogleAuthDto) {
    try {
      if (!this.authclient) {
      throw new Error('Auth client not initialized');
    }
    const ticket = await this.authclient.verifyIdToken({
      idToken: googleAuthDto.googletoken,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token payload');
    }
    const { email, given_name, sub: googleId } = payload;
    
    // Use email as username if given_name is not available
    const username = given_name || email?.split('@')[0] || 'user';
    
    if (!googleId) {
      throw new UnauthorizedException('Invalid Google token');
    }
    
    const user = await this.userservice.FindByGoogleId(googleId);

    if (user) {
      return await this.generateTokenProvider.GenerateToken(user);
    }

    const newUser = await this.userservice.CreateGoogleUser({
      username: username,
      googleId: googleId,
    });
    return await this.generateTokenProvider.GenerateToken(newUser);
    }
     catch (error) {
      throw new UnauthorizedException('Google authentication failed', {
        description: 'Unable to authenticate with Google. Please try again.',
      });
    }
  }
}
