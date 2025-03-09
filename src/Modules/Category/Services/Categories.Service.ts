import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { Errors } from "../../Text/Errors.Messages";
import { GetAllCategoriesSearchDTO } from "../Dtos/GetAllCategoriesSearchDTO";
import { validateHasProductsInCategory, validateIfExistsCategoryWhitName } from "../Helpers/Validators/CategoryValidatos";
import { ICategoryVM } from "../Interfaces/ICategoryVM";
import { CategoryListVM } from "../Models/CategoryListVM";
import { CategoryVM } from "../Models/CategoryVM";
import { changeStatusRepsitory, getAllCategoriesRepository, getCategoryByIdRepository, saveCategoryRepository } from "../Repositories/Categories.Repository";

export const getAllCategoriesService = async (search: GetAllCategoriesSearchDTO): Promise<CategoryListVM> => {
    return await getAllCategoriesRepository(search);
};

export const getCategoryByIdService = async (id: number): Promise<CategoryVM> => {
    return await getCategoryByIdRepository(id);
};

export const changeStatusService = async (id: number): Promise<ResponseMessages> => {
    const hasProducts = await validateHasProductsInCategory(id);
    if (hasProducts) {
        const response = new ResponseMessages();
        response.setError(Errors.CategoryWhitProducts);
        return response;
    }
    return await changeStatusRepsitory(id);
};

export const saveCategoryService = async (category: ICategoryVM): Promise<ResponseMessages> => {
    const existingCategoryWhitName = await validateIfExistsCategoryWhitName(category.Name, category.Id);

    if (existingCategoryWhitName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveCategoryRepository(category);
};
