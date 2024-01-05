import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `localhost`,
  port: `5432`,
  username: `postgres`,
  password: `root`,
  database: `micromq`,
  entities: ['apps/auth/**/*.entity{.ts,.js}'],
  migrations: ['apps/auth/src/db/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
