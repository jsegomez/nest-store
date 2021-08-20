import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../../dtos/users.dto';
import { Order } from '../../entities/order.entity';
import { ProductsService } from '../../../products/services/products/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  users: User[] = [
    {
      id: 10,
      name: 'Josué Eliezer',
      surname: 'Gómez Soto',
      birthDate: new Date('11-12-1985'),
      email: 'jsegomez06@gmail.com',
    },
  ];

  findAll(): CreateUserDto[] {
    const apiKey = this.configService.get('API_KEY');
    console.log(apiKey);
    return this.users;
  }

  findOne(id: number): CreateUserDto {
    const user: CreateUserDto = this.users.find((usr) => usr.id == id);
    return user;
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user: user,
      products: this.productsService.findAll(),
    };
  }
}
