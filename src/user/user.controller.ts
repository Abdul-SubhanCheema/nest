import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserParamDto } from './dtos/finduser-param.dto';
import { UserService } from './user.service';
import { UpdateUserParamDto } from './dtos/updateuser-param.dto';
import { RemoveUserParamDto } from './dtos/removeuser-param.dto';
import { CreateManyUsersDto } from './dtos/create-many-user.dto';
import { AccesstokenGuardGuard } from 'src/auth/guards/accesstoken-guard/accesstoken-guard.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/authtype.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  private createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Get()
  private findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  private findOne(@Param() findUserParamDto: FindUserParamDto) {
    this.userService.findOne(findUserParamDto.id);
  }
  @Post(':id')
  private update(@Param() updateUserParamDto: UpdateUserParamDto) {
    this.userService.update(updateUserParamDto.id);
  }
  @Post(':id')
  private remove(@Param() removeUserParamDto: RemoveUserParamDto) {
    console.log(removeUserParamDto.id);
  }
  @Post('/many')
  @Auth(AuthType.Bearer)
  private createMany(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUsersDto);
  }
}
