import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/createproduct.dto';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    let newProduct = this.productRepository.create(createProductDto);
    newProduct = await this.productRepository.save(newProduct);
    return newProduct;
  }
  findAll() {
    console.log('find all products');
  }

  findOne(id: number) {
    console.log(id);
  }
  update(id: number) {
    console.log(id);
  }
  remove(id: number) {
    console.log(id);
  }
}
