import Product from "../../Models/Products/Product.model";
import { ProductVM } from "../../Models/Products/Product.response.model";

export const mapProductDBToVM = (productDB: Product): ProductVM => {
  const product = {
    Name: productDB.Name,
    Category: "Aca va la categoria",
    Price: productDB.Price,
    UrlPhoto: productDB.UrlPhoto,
  };
  return product;
};
