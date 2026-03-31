/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-unsafe-finally */
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entity/user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';
import { ConflictException, RequestTimeoutException } from '@nestjs/common';

export class CreateManyUserService {
  constructor(private readonly datasource: DataSource) {}
  async createMany(createManyUsersDtos: CreateManyUsersDto) {
    const newUsers: User[] = [];
    const queryRunner = this.datasource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Could not process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }

    try {
      for (const user of createManyUsersDtos.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        'Could not complete the operation try again later',
        {
          description: 'Error processing the transaction',
        },
      );
    } finally {
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not release transaction connection try again later',
          {
            description: 'Error releasing transaction connection',
          },
        );
      }
    }
    return newUsers;
  }
}
