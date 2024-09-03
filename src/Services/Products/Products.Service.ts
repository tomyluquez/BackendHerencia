import { ProductVM } from "../../Models/Products/ProductVM";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import {
  getAllProductsRepository,
  getPromocionalProductsRepository,
} from "../../Repositories/Products/Products.Repository";

export const getAllProductsService = async (
  name: string,
  categories: string[],
  IsActive?: boolean
): Promise<ProductVM> => {
  return await getAllProductsRepository(name, categories, IsActive);
};

export const getPromocionalProductsService =
  async (): Promise<PromotionalProductsVM> => {
    return await getPromocionalProductsRepository();
  };
