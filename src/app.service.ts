import { Injectable } from '@nestjs/common';
import { ConfigService } from './Providers/ConfigService';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    return `Hello World!`;
  }
}
