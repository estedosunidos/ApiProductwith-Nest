import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
   create(@Body()createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }
  
  
  

  @Get()
   findAll() {
     return this.productService.findAll()
   
  }

  @Get(':term')
   findOne(@Param('term') term: string) {
    console.log(term);
    return this.productService.findOne(term)
   
  }

  @Patch(':term')
   update(@Param('term') term: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(term,updateProductDto)
  
  }

  @Delete(':id')
   remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productService.remove(id)

  }
}
