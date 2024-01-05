import { Controller, Get } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { UseFilters } from '@nestjs/common/decorators';
// import { HttpExceptionFilter } from '../../../libs/shared/src';
import { HttpExceptionFilter } from '@app/shared';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  auth() {
    return 5;
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext) {
    const chanel = context.getChannelRef();
    const message = context.getMessage();
    chanel.ack(message);
    return { user: 'USER' };
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser(@Ctx() context: RmqContext) {
    const chanel = context.getChannelRef();
    const message = context.getMessage();
    console.log(JSON.parse(message.content.toString()));
    chanel.ack(message);
    return { user: 'USER2' };
  }
}
