import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthentication } from './providers/google-authentication';
import { GoogleAuthDto } from './dtos/google-auth.dto';
import { AuthType } from '../enums/authtype.enum';
import { Auth } from '../decorators/auth.decorator';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
    constructor(
        private readonly googleAuthentication: GoogleAuthentication
    ) {}

    @Post()
    async authenticate(@Body() googleAuthDto: GoogleAuthDto) {
        return this.googleAuthentication.authenticate(googleAuthDto);
    }
}
