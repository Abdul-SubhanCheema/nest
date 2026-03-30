import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
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
    let existingProduct: Product | null = null;

    try {
      existingProduct = await this.productRepository.findOne({
        where: { name: createProductDto.name },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }
    if (existingProduct) {
      throw new BadRequestException('Product with same name Alreay exists');
    }

    let newProduct = this.productRepository.create(createProductDto);

    try {
      newProduct = await this.productRepository.save(newProduct);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }

    return newProduct;
  }
  findAll() {
    console.log('find all products');
  }

  async findOne(id: number) {
    let product: Product | null = null;
    try {
      product = await this.productRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request try again later',
        {
          description: 'Error connecting to database',
        },
      );
    }
    if (!product) {
      throw new BadRequestException('Product with this id not exist');
    }
    return product;
  }
  update(id: number) {
    console.log(id);
  }
  remove(id: number) {
    console.log(id);
  }
}
