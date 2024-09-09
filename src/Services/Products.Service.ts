import { GetAllProductsSearchDTO } from "../DTO/Products/GetAllProductsSearchDTO";
import { ProductPagedListSearchDTO } from "../DTO/Products/ProductPagedListSearchDTO";
import { existingProductWhitName } from "../Helpers/Validators/ProductsValidators";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { ProductPagedListVM } from "../Models/Products/ProductPagedListVM";
import { ProductVM } from "../Models/Products/ProductVM";
import { PromotionalProductsVM } from "../Models/Products/PromotionalProductsVM.model";
import { changeStatusRepsitory, getAllProductsRepository, getProductByIdRepository, getProductsPagedListRepository, getPromocionalProductsRepository, saveProductRepository } from "../Repositories/Products.Repository";
import { Errors } from "../Text/Errors.Messages";
import { IProductVM } from "../Interfaces/Products/IProductVM";

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

export const saveProductService = async (product: IProductVM): Promise<ResponseMessages> => {
    const existingProduct = await existingProductWhitName(product.Name, product.Id);

    if (existingProduct) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveProductRepository(product);
};
