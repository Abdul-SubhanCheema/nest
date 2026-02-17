import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { create } from 'domain';
import { CreateCategoryDto } from './dtos/createcategory.dto';
import { UpdatecategoryDto } from './dtos/updatecategory.dto';
import { RemoveCategoryDto } from './dtos/removecategory.dto';
import { FindCategoryDto } from './dtos/findcategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    this.categoryService.create(createCategoryDto);
  }
  @Get()
  findAll() {
    this.categoryService.findAll();
  }
  @Get('/:id')
  findOne(@Param() findCategoryDto: FindCategoryDto) {
    this.categoryService.findOne(findCategoryDto.id);
  }
  @Post('/:id')
  update(@Param() updateCategoryDto: UpdatecategoryDto) {
    this.categoryService.update(updateCategoryDto.id);
  }
  @Post('/:id')
  remove(@Param() removeCategoryDto: RemoveCategoryDto) {
    this.categoryService.remove(removeCategoryDto.id);
  }
}
