import { mapProductDBToVM } from "../../Helpers/Maps/MapProductDBToVM";
import Product from "../../Models/Products/Product.model";
import {
  ProductResponse,
  ProductVM,
} from "../../Models/Products/Product.response.model";

export const getAllProductsRepository = async (): Promise<ProductResponse> => {
  const productsDB = await Product.findAll();
  const products = new ProductResponse();

  if (productsDB.length > 0) {
    products.Items = productsDB.map(mapProductDBToVM);
  } else {
    products.AddError("No se encontraron productos");
  }

  return products;
};

export const getAllActivesProductsRepository =
  async (): Promise<ProductResponse> => {
    const productsDB = await Product.findAll({ where: { IsActive: true } });
    const products = new ProductResponse();

    if (productsDB.length > 0) {
      products.Items = productsDB.map(mapProductDBToVM);
    } else {
      products.AddError("No se encontraron productos activos");
    }

    return products;
  };
