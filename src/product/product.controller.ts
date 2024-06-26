import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
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
   findAll(@Query() paginatioDto:PaginationDto) {
     return this.productService.findAll(paginatioDto)
   
  }

  @Get(':term')
   findOne(@Param('term') term: string) {
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
