import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'local';
dotenv.config({ path: __dirname + '/.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  dotenv.config({ path: __dirname + '/.env' });
  console.log(configService.get('RABBITMQ_USER'), process.env.RABBITMQ_USER);
  await app.listen(5000);
}

bootstrap();
