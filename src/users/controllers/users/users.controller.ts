import { Controller, Get, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users/users.service';
import { ParseIntPipe } from '../../../Pipes/parse-int.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private config: ConfigService,
  ) {}

  @Get('/orders/:id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOrdersByUser(id);
  }
}
