import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  DevHost: 'localhost';
  getDevHost() {
    return this.DevHost;
  }
}
