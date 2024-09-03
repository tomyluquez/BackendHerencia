import Category from "../../../db/Models/Category.model";
import { ICategoryVM } from "../../../Interfaces/Category/ICategoryVM";

export const mapCategoryDBToVM = (CategoryDB: Category): ICategoryVM => {
  const product = {
    Id: CategoryDB.Id,
    Name: CategoryDB.Name,
    Image: CategoryDB.UrlPhoto,
    IsActive: CategoryDB.IsActive,
  };
  return product;
};
