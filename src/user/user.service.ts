import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(

    private readonly configservice:ConfigService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
  findAll() {
    const environment=this.configservice.get<string>('POSTGRESQL')
    console.log(environment);
    
    console.log('find all users');
  }
  findOne(id: number) {
    console.log(id);
  }
  update(id: number) {
    console.log(id);
  }
  remove(id: number) {
    console.log(id);
  }
}
