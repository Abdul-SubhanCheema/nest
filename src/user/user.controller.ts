import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserParamDto } from './dtos/finduser-param.dto';
import { UserService } from './user.service';
import { UpdateUserParamDto } from './dtos/updateuser-param.dto';
import { RemoveUserParamDto } from './dtos/removeuser-param.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
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
}
