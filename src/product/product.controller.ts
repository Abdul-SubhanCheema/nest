import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createproduct.dto';
import { FindProductDto } from './dtos/findpoduct.dto';
import { UpdateProductDto } from './dtos/updateproduct.dto';
import { RemoveProductDto } from './dtos/removeproduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  findAll() {
    console.log('find all products');
  }
  @Get('/:id')
  findOne(@Param() findProductDto: FindProductDto) {
    console.log(findProductDto.id);
  }
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Get('/:id')
  update(@Param() updateProductDto: UpdateProductDto) {
    console.log(updateProductDto.id);
  }
  @Get('/:id')
  remove(@Param() removeProductDto: RemoveProductDto) {
    console.log(removeProductDto.id);
  }
}
