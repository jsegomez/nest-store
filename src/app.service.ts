import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    private config: ConfigService,
  ) {}

  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    console.log(apiKey);
    return `Hello World! ${apiKey}`;
  }
}
