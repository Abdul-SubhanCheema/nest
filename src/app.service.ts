import { Injectable } from '@nestjs/common';
import { ConfigService } from './Providers/ConfigService';

@Injectable()
export class AppService {
  constructor(readonly configService: ConfigService) {}
  getHello(): string {
    return `Hello World! this is ${this.configService.getDevHost()}`;
  }
}
