import { IProductVariants } from "./IProductsVariants";

export interface IProductVM {
  Id: number;
  Name: string;
  Price: number;
  Description: string;
  Variants?: IProductVariants[];
  Images: string[];
  CategoryName: string;
  CategoryId: number;
  Discount: number;
  Cost: number;
  IsActive: boolean;
}
