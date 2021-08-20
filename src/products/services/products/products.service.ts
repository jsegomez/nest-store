import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of service',
      price: 100,
      stock: 10,
      image: '',
    },
  ];

  findAll(): CreateProductDto[] {
    return this.products;
  }

  findOne(id: number) {
    const product: CreateProductDto = this.products.find(
      (prod) => prod.id == id,
    );
    return product;
  }

  create(payload: CreateProductDto) {
    this.products.push(payload);
    return payload;
  }

  update(id: number, payload: UpdateProductDto) {
    const index = this.products.findIndex((item) => item.id == id);
    this.products[index] = {
      ...payload,
      ...this.products[index],
    };
    return this.products[index];
  }
}
