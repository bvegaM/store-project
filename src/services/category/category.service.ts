import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { Category } from 'src/entities/category.entity';
import { Response } from 'src/entities/response.entity';

@Injectable()
export class CategoryService {
  private id = 0;
  private categoryList: Category[] = [];

  validateCategory(code: string) {
    return this.categoryList.find((item) => {
      if (item.categoryCode == code) {
        return true;
      } else {
        return false;
      }
    });
  }

  create(payload: CreateCategoryDto) {
    let response: Response;
    if (this.validateCategory(payload.categoryCode)) {
      response = {
        statusCode: 409,
        message: `CategoryCode already exist`,
        description: payload.categoryCode,
      };
      throw new ConflictException(response);
    }
    this.id += 1;
    const newCategory: Category = {
      id: this.id,
      ...payload,
    };
    this.categoryList.push(newCategory);
    response = {
      statusCode: 201,
      message: `Category create successfully`,
      description: newCategory,
    };
    return response;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    let response: Response;
    if (Object.entries(payload).length == 0) {
      response = {
        statusCode: 404,
        message: `Not found data to update`,
        description: payload,
      };
      throw new NotFoundException(response);
    }
    const index = this.categoryList.findIndex((item) => item.id === id);
    this.categoryList[index] = {
      ...category,
      ...payload,
    };
    response = {
      statusCode: 200,
      message: 'Update successfully',
      description: payload,
    };
    return response;
  }

  delete(id: number){
    const category = this.findOne(id);
    this.categoryList = this.categoryList.filter((item) => item.id != id);
    let response: Response = {
      statusCode: 200,
      message: 'Delete successfully',
      description: category,
    };
    return response;
  }

  findAll() {
    return this.categoryList;
  }

  findOne(id: number) {
    const category = this.categoryList.find((item) => item.id == id);
    let response: Response;
    if (!category) {
      response = {
        statusCode: 404,
        message: `Category not found`,
        description: id,
      };
      throw new NotFoundException(response);
    }
    return category;
  }
}
