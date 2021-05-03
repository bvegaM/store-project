import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';
import { Response } from 'src/entities/response.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  private id = 0;
  private userList: User[] = [];

  validateEmail(payload: CreateUserDto) {
    return this.userList.find((item) => {
      if (item.email == payload.email) {
        return true;
      } else {
        return false;
      }
    });
  }

  validateUserName(payload: CreateUserDto) {
    return this.userList.find((item) => {
      if (item.username == payload.username) {
        return true;
      } else {
        return false;
      }
    });
  }

  create(payload: CreateUserDto) {
    this.id += 1;
    let response: Response;
    if (this.validateEmail(payload)) {
      response = {
        statusCode: 409,
        message: `User email already exist`,
        description: payload.email,
      };
      throw new ConflictException(response);
    }
    if (this.validateUserName(payload)) {
      response = {
        statusCode: 409,
        message: `Username already exist`,
        description: payload.username,
      };
      throw new ConflictException(response);
    }
    const newUser = {
      id: this.id,
      ...payload,
    };
    this.userList.push(newUser);
    response = {
      statusCode: 201,
      message: `User create successfully`,
      description: newUser,
    };
    return response;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    let response: Response;
    if (Object.entries(payload).length == 0) {
      response = {
        statusCode: 404,
        message: `Not found data to update`,
        description: payload,
      };
      throw new NotFoundException(response);
    }
    const index = this.userList.findIndex((item) => item.id == id);
    this.userList[index] = {
      ...user,
      ...payload,
    };
    response = {
      statusCode: 200,
      message: 'Update successfully',
      description: payload,
    };
    return response;
  }

  delete(id: number) {
    const user = this.findOne(id);
    this.userList = this.userList.filter((item) => item.id != id);
    let response: Response = {
      statusCode: 200,
      message: 'Delete successfully',
      description: user,
    };
    return response;
  }

  findOne(id: number) {
    const product = this.userList.find((item) => item.id == id);
    let response: Response;
    if (!product) {
      response = {
        statusCode: 404,
        message: `User not found`,
        description: id,
      };
      throw new NotFoundException(response);
    }
    return product;
  }

  findAll() {
    return this.userList;
  }
}
