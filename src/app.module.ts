import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './app.controller';

// Variables de entorno
import { environments } from './environments';
import config from './config';
import * as Joi from 'joi';

// Modulos
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_CNN: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
