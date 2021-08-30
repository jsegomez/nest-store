import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Controladores
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';

// Servicios
import { BrandService } from './services/brand/brand.service';
import { CategoryService } from './services/category/category.service';
import { ProductsService } from './services/products/products.service';

// Esquemas
import { Brand, BrandSchema } from './entities/brand.entity';
import { Category, CategorySchema } from './entities/category.entity';
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Brand.name,
        schema: BrandSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandService, CategoryService],
  exports: [ProductsService],
})
export class ProductsModule {}
