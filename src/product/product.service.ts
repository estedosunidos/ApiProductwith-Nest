import { Model } from 'mongoose';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ProductController } from './product.controller';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private  productModel: Model<Product>
  ) {}

    async create(createProductDto: CreateProductDto) {
       createProductDto.nameproduct=createProductDto.nameproduct.toLocaleLowerCase()
       try{
        const product = await this.productModel.create(createProductDto)
        return product
       }catch(err){
        if(err.coder === 11000){
          throw new  BadRequestException(`Product exists in db ${JSON.stringify(err.keyValue)}`)
        }
        console.log(err)
        throw new InternalServerErrorException(`Can  not create Product - check server logs `)
  
      }
       }
    
   
  

  findAll() {
    return this.productModel.find();
  }

  async findOne(term: string) {
    let product: Product | null = null;
    console.log("ss", term);
  
    if(!product){
      product = await this.productModel.findOne({ nameproduct: term.toLowerCase().trim() });

    }
      
      return product
    
  

  }
  

  async update(term: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(term)
    if(updateProductDto.nameproduct){
      updateProductDto.nameproduct=updateProductDto.nameproduct.toLowerCase()
    }
    try{
      await product.updateOne(updateProductDto)
      return {...product.toJSON(),...updateProductDto}
  

    }catch(err){
      if(err.coder === 11000){
        throw new  BadRequestException(`Product exists in db ${JSON.stringify(err.keyValue)}`)
      }
      console.log(err)
      throw new InternalServerErrorException(`Can  not create Product - check server logs `)

    }
   
  }

  async remove(id: string) {
     const {deletedCount} =await this.productModel.deleteOne({_id:id})
     if(deletedCount===0){
      throw new BadRequestException(`Product does not exist	`)
    
     }
     return 

  }
}


