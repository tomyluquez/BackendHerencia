import Product from "../../../db/Models/Products/Product.model";
import { IPromotionalProduct } from "../../../Interfaces/Products/IPromotionalProducts";

export const mapPromotionalDBToVM = (
  productDB: Product
): IPromotionalProduct => {
  const product = {
    Id: productDB.Id,
    Name: productDB.Name,
    Price: productDB.Price,
    Image: productDB.Images ? productDB.Images[0] : "",
    CategoryName: productDB.Category?.Name || "Sin categoria",
  };
  return product;
};
