import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { CategoryService } from 'src/services/category/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':id')
  update(@Param('id',ParseIntPipe) id: number,@Body() payload:UpdateCategoryDto){
    return this.categoryService.update(id,payload)
  }

  @Delete(':id')
  delete(@Param('id',ParseIntPipe) id: number){
    return this.categoryService.delete(id);
  }

  @Get()
  getAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }
}
