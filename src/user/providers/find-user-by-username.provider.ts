import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class FindUserByUsernameProvider {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findByUsername(username:string){
        let user: User | null = null;
        try {
            user = await this.userRepository.findOneBy({
                username,
            });
        } catch (error) {
            throw new Error('Unable to process your request try again later');
        }
        if (!user) {
            throw new Error('User with this username does not exist.');
        }
        return user;
    }
}
