import Category from "../../db/Models/Category.model";
import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";

export const mapCategoryDBToVM = (CategoryDB: Category): ICategoryVM => {
    const category = {
        Id: CategoryDB.Id || 0,
        Name: CategoryDB.Name,
        Image: CategoryDB.Image,
        IsActive: CategoryDB.IsActive,
        Products: CategoryDB.Products ? CategoryDB.Products : []
    };
    return category;
};
