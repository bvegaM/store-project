import { Brand } from "./brand.entity";
import { Category } from "./category.entity";

export class Product{
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: Category;
  brand: Brand;
}
