import { ProductsService } from '../../services/products/products.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../../dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../../Pipes/mongo-id/mongo-id.pipe';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  //Parametros en controlador
  @Get('all')
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params?: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Get(':id')
  findById(@Param('id', MongoIdPipe) id: string) {
    const product = this.productService.findOne(id);
    return product;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateProductDto) {
    const product = this.productService.create(data);
    return product;
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() data: UpdateProductDto) {
    const product = this.productService.update(id, data);
    return product;
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
