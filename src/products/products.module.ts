import { Module } from '@nestjs/common';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Controladores
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';

// Servicios
import { ProductsService } from './services/products/products.service';

// Esquemas
import { Product, ProductSchema } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
