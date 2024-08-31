import {
  ProductResponse,
  ProductVM,
} from "../../Models/Products/Product.response.model";
import {
  getAllActivesProductsRepository,
  getAllProductsRepository,
} from "../../Repositories/Products/Products.Repository";

export const getAllProductsService = async (): Promise<ProductResponse> => {
  return await getAllProductsRepository();
};

export const getAllActivesProductsService =
  async (): Promise<ProductResponse> => {
    return await getAllActivesProductsRepository();
  };
