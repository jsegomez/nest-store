import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../../services/customer/customer.service';
import { MongoIdPipe } from '../../../Pipes/mongo-id/mongo-id.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomerService) {}

  @Get('all')
  getAll() {
    return this.customerService.finAll();
  }

  @Get(':id')
  getById(@Param('id', MongoIdPipe) id: string) {
    return this.customerService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateCustomerDto) {
    return this.customerService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() data: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.customerService.delete(id);
  }
}
