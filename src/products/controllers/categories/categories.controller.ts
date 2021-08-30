import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../../services/category/category.service';
import { MongoIdPipe } from '../../../Pipes/mongo-id/mongo-id.pipe';
import { CreateCategory, UpdateCategoryDto } from '../../dtos/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  getCategories() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getBrandById(@Param('id', MongoIdPipe) id: string) {
    const brand = this.categoryService.findById(id);
    return brand;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateCategory) {
    return this.categoryService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.categoryService.delete(id);
  }
}
