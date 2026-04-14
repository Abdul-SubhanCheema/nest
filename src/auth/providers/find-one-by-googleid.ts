import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class FindOneByGoogleid {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
    ) {}
    public async FindOneByGoogleId(googleId: string) {
        return await this.userRepository.findOneBy({ googleId });
    }
}
