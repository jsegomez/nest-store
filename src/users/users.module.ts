import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Controladores
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';

// Modulos importados
import { ProductsModule } from '../products/products.module';

// Servicios
import { UsersService } from './services/users/users.service';
import { CustomerService } from './services/customer/customer.service';

// Entities
import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomerService],
})
export class UsersModule {}
