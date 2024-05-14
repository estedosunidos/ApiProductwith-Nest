import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({
        unique: true,
        index: true,
    })
    nameproduct: string;
    @Prop()
    amount: number;
    @Prop()
    price:number

}

export const ProductSchema = SchemaFactory.createForClass(Product);
