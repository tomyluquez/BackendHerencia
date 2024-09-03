import Category from "../../db/Models/Category.model";
import { mapCategoryDBToVM } from "../../Helpers/Maps/Categories/MapCategoryDBToVm";
import { CategoryListVM } from "../../Models/Category/CategoryListVM";
import { CategoryVM } from "../../Models/Category/CategoryVM";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";

export const getActivesCategoriesRepository = async (
  IsActive?: boolean
): Promise<CategoryListVM> => {
  const categories = new CategoryListVM();
  const filters: any = {};

  if (IsActive !== undefined) {
    filters.IsActive = IsActive;
  }
  const categoriesDB = await Category.findAll({
    where: filters,
  });
  if (categoriesDB.length > 0) {
    categories.Items = categoriesDB.map(mapCategoryDBToVM);
  } else {
    categories.AddWarning("No se encontraron categorías");
  }

  return categories;
};

export const getCategoryByIdRepository = async (
  id: number
): Promise<CategoryVM> => {
  const category = new CategoryVM();
  const categoryDB = await Category.findOne({ where: { Id: id } });
  if (categoryDB) {
    category.AddCategory(mapCategoryDBToVM(categoryDB));
  } else {
    category.AddError("No se encontro la categoria");
  }
  return category;
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

    response.AddSuccess("La categoría se actualizo correctamente.");
  } catch (error: any) {
    response.AddError(error.message);
  }
  return response;
};
