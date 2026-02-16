import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  create() {
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
