import Category from "../../../../db/Models/Category.model";
import { mapPaginationQueryToDTO } from "../../../Other/Helpers/Maps/Maps";
import { GetAllCategoriesSearchDTO } from "../../Dtos/GetAllCategoriesSearchDTO";
import { ICategoryVM } from "../../Interfaces/ICategoryVM";

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
        Name: query.name,
        IsActive,
        Pagination: mapPaginationQueryToDTO(query)
    };
};
