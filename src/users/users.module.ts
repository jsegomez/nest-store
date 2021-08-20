import { Module } from '@nestjs/common';

// Controladores
import { UsersController } from './controllers/users/users.controller';

// Modulos importados
import { ProductsModule } from '../products/products.module';

// Servicios
import { UsersService } from './services/users/users.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
