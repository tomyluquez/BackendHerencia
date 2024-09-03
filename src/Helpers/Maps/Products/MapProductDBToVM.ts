import Product from "../../../db/Models/Products/Product.model";
import { IProductVM } from "../../../Interfaces/Products/IProductVM";

export const mapProductDBToVM = (productDB: Product): IProductVM => {
  const product = {
    Id: productDB.Id,
    Name: productDB.Name,
    Price: productDB.Price,
    Description: productDB.Description,
    Variants: productDB.Variants!.map((variant) => {
      return {
        Stock: variant.Stock,
        Name: variant.Size!.Name,
      };
    }),
    Images: productDB.Images || [],
    CategoryName: productDB.Category?.Name || "Sin categoria",
    CategoryId: productDB.CategoryId,
    Discount: productDB.Discount,
    Cost: productDB.Cost,
    IsActive: productDB.IsActive,
  };
  return product;
};
