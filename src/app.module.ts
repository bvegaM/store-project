import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user/user.controller';
import { CategoryController } from './controllers/category/category.controller';
import { BrandController } from './controllers/brand/brand.controller';
import { ProductController } from './controllers/product/product.controller';
import { OrderController } from './controllers/order/order.controller';
import { UserService } from './services/user/user.service';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { OrderService } from './services/order/order.service';
import { BrandService } from './services/brand/brand.service';


@Module({
  imports: [],
  controllers: [AppController, UserController, CategoryController, BrandController, ProductController, OrderController],
  providers: [AppService, UserService, CategoryService, ProductService, OrderService, BrandService,],
})
export class AppModule {}
