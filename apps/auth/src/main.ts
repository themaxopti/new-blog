import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  const USER = configService.get('RABBITMQ_USER') || 'user';
  const PASSWORD = configService.get('RABBITMQ_PASS') || 'password';
  const HOST = configService.get('RABBITMQ_HOST') || 'localhost:5672';
  const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE') || 'auth_queue';

  console.log(
    configService,
    process.env.RABBITMQ_USER,
    configService.get('RABBITMQ_USER'),
    PASSWORD,
    HOST,
    QUEUE,
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
