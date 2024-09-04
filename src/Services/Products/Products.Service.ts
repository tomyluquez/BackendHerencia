import { ProductPagedListSearchDTO } from "../../DTO/Products/ProductPagedListSearchDTO";
import { ProductPagedListVM } from "../../Models/Products/ProductPagedListVM";
import { ProductVM } from "../../Models/Products/ProductVM";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import {
    getAllProductsRepository,
    getProductsPagedListRepository,
    getPromocionalProductsRepository
} from "../../Repositories/Products/Products.Repository";

export const getAllProductsService = async (
    name: string,
    categories: string[],
    IsActive?: boolean
): Promise<ProductVM> => {
    return await getAllProductsRepository(name, categories, IsActive);
};

export const getPromocionalProductsService = async (): Promise<PromotionalProductsVM> => {
    return await getPromocionalProductsRepository();
};

export const getProductsPagedListsService = async (search: ProductPagedListSearchDTO): Promise<ProductPagedListVM> => {
    return await getProductsPagedListRepository(search);
};
