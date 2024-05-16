import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema,  } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[
   
    MongooseModule.forFeature([{
      name: Product.name,
      schema: ProductSchema,
    }]),
    ConfigModule
  ],
  exports:[MongooseModule]
})
export class ProductModule {}
