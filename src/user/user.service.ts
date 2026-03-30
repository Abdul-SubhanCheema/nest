import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { CreateManyUserService } from './providers/create-many-user';
import { CreateManyUsersDto } from './dtos/create-many-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly configservice: ConfigService,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly datasource: DataSource,
    private readonly createManyUserService: CreateManyUserService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null = null;
    try {
      existingUser = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }
    if (existingUser) {
      throw new BadRequestException(
        'User already exists. Try using another one.',
      );
    }

    let newUser = this.userRepository.create(createUserDto);

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }
    return newUser;
  }
  findAll() {
    const environment = this.configservice.get<string>('POSTGRESQL');
    console.log(environment);

    console.log('find all users');
  }

  async findOne(id: number) {
    let user: User | null = null;
    try {
      user = await this.userRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('User with this id does not exist.');
    }
    return user;
  }
  update(id: number) {
    console.log(id);
  }
  remove(id: number) {
    console.log(id);
  }

  async createMany(createManyUsersDtos: CreateManyUsersDto) {
    return this.createManyUserService.createMany(createManyUsersDtos);
  }
}
