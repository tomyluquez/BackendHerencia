import Category from "../../db/Models/Category.model";
import { GetAllCategoriesSearchDTO } from "../../DTO/Categories/GetAllCategoriesSearchDTO";
import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";
import { mapPaginationQueryToDTO } from "./Maps";

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

export const mapCategoriesSearchQueryToDTO = (query: any, IsActive: boolean | undefined): GetAllCategoriesSearchDTO => {
    return {
        IsActive,
        Pagination: mapPaginationQueryToDTO(query)
    };
};
