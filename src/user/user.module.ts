import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateManyUserService } from './providers/create-many-user';
import { CreateuserProvider } from './providers/createuser.provider';
import { FindUserByUsernameProvider } from './providers/find-user-by-username.provider';
import jwtConfig from 'src/Config/jwt.config';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { FindOneByGoogleid } from 'src/auth/providers/find-one-by-googleid';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, CreateManyUserService, CreateuserProvider,  FindUserByUsernameProvider, FindOneByGoogleid, CreateGoogleUserProvider],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User]),
  ConfigModule.forFeature(jwtConfig),JwtModule.registerAsync(jwtConfig.asProvider())],
})
export class UserModule {}
