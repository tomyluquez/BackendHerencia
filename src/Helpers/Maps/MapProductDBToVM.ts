import Product from "../../db/Models/Product.model";
import { ProductVM } from "../../Models/Products/Product.response.model";

export const mapProductDBToVM = (productDB: Product): ProductVM => {
  console.log(productDB);
  const product = {
    Name: productDB.Name,
    Category: productDB.Category?.Name || "Sin categoria",
    Price: productDB.Price,
    UrlPhoto: productDB.UrlPhoto,
    IsActive: productDB.IsActive,
  };
  return product;
};
