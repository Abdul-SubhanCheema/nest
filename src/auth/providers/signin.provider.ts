import { forwardRef, Inject, Injectable, Req, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { HashingProvider } from './hashing.provider';
import { SignInDto } from '../dtos/signin.dto';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/Config/jwt.config';
import { ActiveUserData } from '../Interfaces/activeuser.interface-data';
import { GenerateTokenProvider } from './generate-token.provider';

@Injectable()
export class SigninProvider {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        private readonly hashingprovider: HashingProvider,

        private readonly generateTokenProvider: GenerateTokenProvider,

       

    ) {}
    async SignIn(signInDto: SignInDto) {
        let user = await this.userService.FindByUsername(signInDto.username);

        let isEqual: boolean = false;
        try {
           isEqual= await this.hashingprovider.comparePassword(signInDto.password, user.password); 
        } catch (error) {
            throw new RequestTimeoutException('Unable to compare passwords', {
                description: 'Error connecting to hashing service',
                });
        }           
        if (!isEqual) {
            throw new UnauthorizedException('Invalid credentials', {
                description: 'The password you entered is incorrect',
                });

        }

        return this.generateTokenProvider.GenerateToken(user);
    }
}
