import Category from "../../db/Models/Category.model";
import Product from "../../db/Models/Products/Product.model";
import { Errors } from "../../Helpers/Errors/Messages";
import { mapCategoryDBToVM } from "../../Helpers/Maps/MapCategoryDBToVm";
import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";
import { CategoryListVM } from "../../Models/Category/CategoryListVM";
import { CategoryVM } from "../../Models/Category/CategoryVM";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";

export const getActivesCategoriesRepository = async (IsActive?: boolean): Promise<CategoryListVM> => {
    const categories = new CategoryListVM();
    const filters: any = {};

    if (IsActive !== undefined) {
        filters.IsActive = IsActive;
    }
    const categoriesDB = await Category.findAll({
        where: filters
    });
    if (categoriesDB.length > 0) {
        categories.Items = categoriesDB.map(mapCategoryDBToVM);
    } else {
        categories.setWarning("No se encontraron categorías");
    }

    return categories;
};

export const getCategoryByIdRepository = async (id: number, includeProducts = false): Promise<CategoryVM> => {
    const category = new CategoryVM();
    const filters: any = { where: { Id: id } };

    if (includeProducts) {
        filters.include = [{ model: Product, as: "Products" }];
    }

    const categoryDB = await Category.findOne(filters);
    if (categoryDB) {
        category.AddCategory(mapCategoryDBToVM(categoryDB));
    } else {
        category.setError(Errors.CategoryNotFound);
    }
    console.log(category);
    return category;
};

export const getCategoryIdByNameRepository = async (Name: string): Promise<number> => {
    const categoryDB = await Category.findOne({ where: { Name } });
    if (categoryDB) {
        return categoryDB.Id!;
    } else {
        return 0;
    }
};

export const changeStatusRepsitory = async (Id: number, IsActive: boolean) => {
    let response = new ResponseMessages();
    try {
        const [affectedRows] = await Category.update(
            { IsActive }, // Valores a actualizar
            { where: { Id } } // Condición de búsqueda
        );

        // Verificamos si se actualizó alguna fila
        if (affectedRows === 0) {
            throw new Error("No se encontró la categoría o no se pudo actualizar.");
        }

        response.setSuccess("La categoría se actualizo correctamente.");
    } catch (error: any) {
        response.setError(error.message);
    }
    return response;
};

export const saveCategoryRepository = async (category: ICategoryVM): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    if (category.Id) {
        const [affectedRows] = await Category.update(category, { where: { Id: category.Id } });
        if (affectedRows === 0) {
            response.setError(Errors.CategorySave);
            return response;
        }
    } else {
        const newCategory = await Category.create(category);
        if (!newCategory) {
            response.setError(Errors.CategorySave);
            return response;
        }
    }
    response.setSuccess("La categoría se actualizo correctamente.");
    return response;
};
