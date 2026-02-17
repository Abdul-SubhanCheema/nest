import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/createcategory.dto';

@Injectable()
export class CategoryService {
  create(createCategoryDto: CreateCategoryDto) {
    console.log('create category');
  }
  findAll() {
    console.log('find all categories');
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
