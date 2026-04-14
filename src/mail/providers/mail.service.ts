import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
    public async sendWelcomeMail(user:User){
        await this.mailerService.sendMail({
            to:user.username,
            subject:'Welcome to our app',
            template:'../templates/welcome.ejs',
            context:{
                name:user.username,
            }
        })
    }
}
