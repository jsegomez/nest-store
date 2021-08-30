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
import { MongoIdPipe } from '../../../Pipes/mongo-id/mongo-id.pipe';
import { CreateBrandDto, UpdateBrandDto } from '../../dtos/brand.dto';
import { BrandService } from '../../services/brand/brand.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}

  @Get('all')
  getBrand() {
    return this.brandService.findAll();
  }

  @Get(':id')
  getBrandById(@Param('id', MongoIdPipe) id: string) {
    const brand = this.brandService.findOne(id);
    return brand;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateBrandDto) {
    return this.brandService.create(data);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() data: UpdateBrandDto) {
    return this.brandService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.delete(id);
  }
}
