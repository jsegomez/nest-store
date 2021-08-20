import { Module } from '@nestjs/common';

// Controladores
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

// Servicios
import { ProductsService } from './services/products/products.service';

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
