import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  @Get()
  async getUser() {
    console.log(process.env.RABBITMQ_USER);
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      {},
    );
  }

  @Post()
  async createUser() {
    console.log(process.env.RABBITMQ_USER);
    return this.authService.send(
      {
        cmd: 'create-user',
      },
      {
        userName: 'user',
        email: 'themaxopti@gmail.com',
        password: '12345',
      },
    );
  }
}
