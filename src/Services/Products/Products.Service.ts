import { GetAllProductsSearchDTO } from "../../DTO/Products/GetAllProductsSearchDTO";
import { ProductPagedListSearchDTO } from "../../DTO/Products/ProductPagedListSearchDTO";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";
import { ProductPagedListVM } from "../../Models/Products/ProductPagedListVM";
import { ProductVM } from "../../Models/Products/ProductVM";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import { changeStatusRepsitory, getAllProductsRepository, getProductByIdRepository, getProductsPagedListRepository, getPromocionalProductsRepository } from "../../Repositories/Products/Products.Repository";

export const getAllProductsService = async (search: GetAllProductsSearchDTO): Promise<ProductVM> => {
    return await getAllProductsRepository(search);
};

export const getPromocionalProductsService = async (): Promise<PromotionalProductsVM> => {
    return await getPromocionalProductsRepository();
};

export const getProductsPagedListsService = async (search: ProductPagedListSearchDTO): Promise<ProductPagedListVM> => {
    return await getProductsPagedListRepository(search);
};

export const getProductByIdService = async (id: number): Promise<ProductVM> => {
    return await getProductByIdRepository(id);
};

export const changeStatusService = async (id: number, IsActive: boolean): Promise<ResponseMessages> => {
    return await changeStatusRepsitory(id, IsActive);
};
