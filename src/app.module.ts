import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

import { EnvConfiguration } from './config/app.config';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { JoinValidacionSchema } from './config/joi.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      validationSchema:JoinValidacionSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    ProductModule,
    CommonModule,
    SeedModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
 
}
