import { ProductResponse } from "../../Models/Products/Product.response.model";
import {
  getAllProductsRepository,
  getPromocionalProductsRepository,
} from "../../Repositories/Products/Products.Repository";

export const getAllProductsService = async (
  name: string,
  categories: string[],
  IsActive?: boolean
): Promise<any> => {
  return await getAllProductsRepository(name, categories, IsActive);
};

export const getPromocionalProductsService =
  async (): Promise<ProductResponse> => {
    return await getPromocionalProductsRepository();
  };
