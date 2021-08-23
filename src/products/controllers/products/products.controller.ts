import { ProductsService } from '../../services/products/products.service';
import { Product } from '../../entities/product.entity';
import { NotFoundException } from '@nestjs/common';
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
} from '@nestjs/common';

import { ParseIntPipe } from '../../../Pipes/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // Parametros en controlador
  @Get('all')
  @ApiOperation({ summary: 'List of products' })
  getProducts(): Product[] {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    const product = this.productService.findOne(id);
    if (!product) {
      return new NotFoundException(`Producto con id ${id} no existe!..`);
    }

    return product;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    const product = this.productService.create(payload);
    return product;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    const product = this.productService.update(id, payload);
    return product;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return { response: `Delete product id: ${id}` };
  }
}
