import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1 style="text-align: center; font-family: sans-serif">This is the root endpoint for the idea exchage api</h1>`;
  }
}
