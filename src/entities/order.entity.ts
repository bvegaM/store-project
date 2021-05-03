import { Product } from "./product.entity";
import { User } from "./user.entity";

export class Order{
  id: number;
  user: User;
  productList: Product[];
}
