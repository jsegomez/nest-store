import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

// Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { Category } from 'src/products/entities/category.entity';
import { CreateCategory, UpdateCategoryDto } from '../../dtos/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll() {
    const categories: CreateCategory[] = await this.categoryModel.find();
    if (categories.length == 0) {
      throw new NotFoundException(
        'No se encontraron registros en base de datos',
      );
    }

    return categories;
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`No se encontro registor con id: ${id}`);
    }

    return category;
  }

  async create(data: CreateCategory) {
    const category = await this.categoryModel.findOne({ name: data.name });

    if (category) {
      throw new BadRequestException(`Ya existe una categoria ${data.name}`);
    }

    const newCategory = new this.categoryModel(data);
    return await newCategory.save();
  }

  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    );

    if (!category) {
      throw new NotFoundException(`No se encontro registro con id: ${id}`);
    }

    return category;
  }

  async delete(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException(`No se encontro registro con id: ${id}`);
    }
    return category;
  }
}
