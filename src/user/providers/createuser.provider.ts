/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateuserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly mailService: MailService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    let existingUser: User | null = null;
    try {
      existingUser =
        (await this.userRepository.findOne({
          where: { username: createUserDto.username },
        })) || null;
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

    let newUser = this.userRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

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
    try {
      await this.mailService.sendWelcomeMail(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error sending welcome email',
        },
      );
    }
    return newUser;
  }
}
