import { CategoryVM } from "../../Models/Category/CategoryVM";
import {
    getCategoryByIdRepository,
    getCategoryIdByNameRepository
} from "../../Repositories/Categories/Categories.Repository";

export const validateHasProductsInCategory = async (id: number): Promise<boolean> => {
    const category: CategoryVM = await getCategoryByIdRepository(id, true);
    return (
        !category.hasErrors() &&
        !category.hasWarnings() &&
        !!(category.Item && category.Item.Products && category.Item.Products.length > 0)
    );
};

export const validateIfExistsCategoryWhitName = async (name: string, categoryId: number): Promise<boolean> => {
    const existingCategory = await getCategoryIdByNameRepository(name.toLowerCase());

    if (!existingCategory) return false;

    return existingCategory !== categoryId;
};
