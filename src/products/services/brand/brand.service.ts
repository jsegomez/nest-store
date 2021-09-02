import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Modelo a utilizar
import { Brand } from 'src/products/entities/brand.entity';

// Modelos de apoyo
import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll() {
    return await this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) {
      throw new NotFoundException(`Marca con id ${id} no fue encontrado`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const brand = await this.brandModel.findOne({ name: data.name });
    if (brand) {
      throw new BadRequestException(
        `Ya exista una marca con el nombre: ${data.name}`,
      );
    }

    const newBrand = new this.brandModel(data);
    return await newBrand.save();
  }

  async update(id: string, data: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!brand) {
      throw new NotFoundException(`Marca con id : ${id} no fue encontrado`);
    }
    return brand;
  }

  async delete(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id).exec();

    if (!brand) {
      throw new NotFoundException(`Marca con id ${id} no fue encontrado`);
    }
  }
}
