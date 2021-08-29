import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Modulo a utilizar
import { Product } from 'src/products/entities/product.entity';

// Modelos de apoyo
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params;
      return await this.productModel.find().skip(offset).limit(limit);
    }

    return await this.productModel.find();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no fue encontrado`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async update(id: string, data: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!product) {
      throw new NotFoundException(`Producto con id : ${id} no fue encontrado`);
    }
    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no fue encontrado`);
    }
  }
}
