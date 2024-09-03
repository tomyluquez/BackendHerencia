import { CategoryListVM } from "../../Models/Category/CategoryListVM";
import { CategoryVM } from "../../Models/Category/CategoryVM";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";
import {
  changeStatusRepsitory,
  getActivesCategoriesRepository,
  getCategoryByIdRepository,
} from "../../Repositories/Categories/Categories.Repository";

export const getActivesCategoriesService = async (
  IsActive?: boolean
): Promise<CategoryListVM> => {
  return await getActivesCategoriesRepository(IsActive);
};

export const getCategoryByIdService = async (
  id: number
): Promise<CategoryVM> => {
  return await getCategoryByIdRepository(id);
};

export const changeStatusService = async (
  id: number,
  IsActive: boolean
): Promise<ResponseMessages> => {
  return await changeStatusRepsitory(id, IsActive);
};
