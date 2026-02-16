import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { create } from 'domain';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  create() {
    this.categoryService.create();
  }
  @Get()
  findAll() {
    this.categoryService.findAll();
  }
  @Get('/:id')
  findOne(id: number) {
    this.categoryService.findOne(id);
  }
  @Post('/:id')
  update(id: number) {
    this.categoryService.update(id);
  }
  @Post('/:id')
  remove(id: number) {
    this.categoryService.remove(id);
  }
}
