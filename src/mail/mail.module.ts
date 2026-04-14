import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { options } from 'joi';


@Global()
@Module({
  imports: [MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: {
        host: configService.get('appConfig.mailHost'),
        secure:false,
        port:2525,
        auth: {
          user: configService.get('appConfig.mailUsername'),
          pass: configService.get('appConfig.mailPassword'),
        },
        defaults: {
          from: `"nest-modules" <${configService.get('appConfig.mailUsername')}>`,
        },
        template:{
          dir:join(__dirname,'templates'),
          adapter:new EjsAdapter({
            inlineCssEnabled:true,
          }),
          options:{
            strict:false,
          }
        }
      },
    }),
  })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
