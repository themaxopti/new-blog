import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        // const USER = configService.get('RABBITMQ_USER');
        // const PASSWORD = configService.get('RABBITMQ_PASS');
        // const HOST = configService.get('RABBITMQ_HOST');
        // const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE');

        const USER = configService.get('RABBITMQ_USER') || 'user';
        const PASSWORD = configService.get('RABBITMQ_PASS') || 'password';
        const HOST = configService.get('RABBITMQ_HOST') || 'localhost:5672';
        const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE') || 'auth_queue';
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
