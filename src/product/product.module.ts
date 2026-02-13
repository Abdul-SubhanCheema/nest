import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { connection } from 'src/Constants/constant';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class ProductModule {}
