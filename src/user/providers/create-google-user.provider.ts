import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { GoogleUserInterface } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async CreateGoogleUser(googleUser: GoogleUserInterface): Promise<User> {
        try {
             const newUser = this.userRepository.create(googleUser);
        return this.userRepository.save(newUser);
        } catch (error) {
            throw new Error(`Failed to create Google user: ${error}`);
        }
       
    }
}
