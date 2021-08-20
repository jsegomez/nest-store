import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

// Controllers
import { AppController } from './app.controller';

// Variables de entorno
import { environments } from '../environments';

// Modulos
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
