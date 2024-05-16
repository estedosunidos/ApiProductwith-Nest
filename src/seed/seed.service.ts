
import { Injectable } from '@nestjs/common';
import { ProductResponse, Name } from './interfaces/product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Model } from 'mongoose'
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
export class SeedService {
  constructor(
    @InjectModel(Product.name)
    private  productModel: Model<Product>,
    private readonly http: AxiosAdapter
  ) {}
  async executeseed() {
    // Elimina todos los documentos existentes en la colección 'products'
    await this.productModel.deleteMany({});

    // Realiza una solicitud GET a la API para obtener datos de productos
    const response = await this.http.get<ProductResponse[]>('https://api.escuelajs.co/api/v1/products?limit=50');
    const data = response; // Obtiene los datos reales de la respuesta
    // Inicializa un arreglo para almacenar las promesas de inserción de productos
    const insertPromises: Promise<{ nameproduct: string, price: number }>[] = [];

    // Itera sobre cada objeto de producto en los datos obtenidos
    for (const productData of data) {
        const { title, price } = productData; // Obtiene el nombre y precio del producto actual

        // Busca un producto en la base de datos con el mismo nombre
        const existingProduct = await this.productModel.findOne({ nameproduct: title });

        // Si no se encuentra un producto existente con el mismo nombre
        if (!existingProduct) {
            // Agrega una promesa de creación de producto al arreglo insertPromises
            insertPromises.push(this.productModel.create({ nameproduct: title, price }));
            console.log(`Created product with name ${title} and price ${price}`); // Muestra un mensaje de éxito en la consola
        } else {
            console.log(`Product with name ${title} already exists, skipping...`); // Muestra un mensaje de que el producto ya existe en la consola
        }
    }

    // Espera a que todas las promesas de inserción se completen
    await Promise.all(insertPromises);

    // Devuelve un mensaje indicando que la función de siembra se ha ejecutado
    return 'Seed executed';
}


}




