import Category from "../../db/Models/Category.model";
import { Errors } from "../../Helpers/Errors/Messages";
import {
    validateHasProductsInCategory,
    validateIfExistsCategoryWhitName
} from "../../Helpers/Validators/CategoryValidatos";
import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";
import { CategoryListVM } from "../../Models/Category/CategoryListVM";
import { CategoryVM } from "../../Models/Category/CategoryVM";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";
import {
    changeStatusRepsitory,
    getActivesCategoriesRepository,
    getCategoryByIdRepository,
    saveCategoryRepository
} from "../../Repositories/Categories/Categories.Repository";

export const getActivesCategoriesService = async (IsActive?: boolean): Promise<CategoryListVM> => {
    return await getActivesCategoriesRepository(IsActive);
};

export const getCategoryByIdService = async (id: number): Promise<CategoryVM> => {
    return await getCategoryByIdRepository(id);
};

export const changeStatusService = async (id: number, IsActive: boolean): Promise<ResponseMessages> => {
    const hasProducts = await validateHasProductsInCategory(id);
    if (hasProducts) {
        const response = new ResponseMessages();
        response.setError(Errors.CategoryWhitProducts);
        return response;
    }
    return await changeStatusRepsitory(id, IsActive);
};

export const saveCategoryService = async (category: ICategoryVM): Promise<ResponseMessages> => {
    const existingCategoryWhitName = await validateIfExistsCategoryWhitName(category.Name, category.Id || 0);

    if (existingCategoryWhitName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveCategoryRepository(category);
};
