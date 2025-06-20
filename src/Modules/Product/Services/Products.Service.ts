import { GetAllProductsSearchDTO } from "../Dtos/GetAllProductsSearchDTO";
import { ProductPagedListSearchDTO } from "../Dtos/ProductPagedListSearchDTO";
import { existingProductWhitName } from "../Helpers/Validators/ProductsValidators";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { ProductPagedListVM } from "../Models/ProductPagedListVM";
import { ProductVM } from "../Models/ProductVM";
import { PromotionalProductsVM } from "../Models/PromotionalProductsVM.model";
import {
    changeStatusRepsitory,
    getAllProductsRepository,
    getPriceListProductsRepository,
    getProductByIdRepository,
    getProductsPagedListRepository,
    getProductsRepository,
    getPromocionalProductsRepository,
    saveProductRepository,
    updateAllProductsPricetRepository,
    updatePriceProductRepository
} from "../Repositories/Products.Repository";
import { Errors } from "../../Text/Errors.Messages";
import { IProductVM } from "../Interfaces/IProductVM";
import { PriceListProductsVM } from "../Models/PriceListProductsVM";
import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";
import { PriceListProductsSearchDTO } from "../Dtos/PriceListProductsSearchDTO";
import { UpdateAllPriceProductDTO, UpdatePriceProductDTO } from "../Dtos/UpdatePriceProduct";
import { Products } from "../Models/Product";
import { GetAllCategoriesSearchDTO } from "../../Category/Dtos/GetAllCategoriesSearchDTO";
import { HomeInfoResponse } from "../../Other/Models/HomeInfo.model";
import { getAllCategoriesService } from "../../Category/Services/Categories.Service";

export const getAllProductsService = async (search: GetAllProductsSearchDTO): Promise<ProductVM> => {
    return await getAllProductsRepository(search);
};

export const getPromocionalProductsService = async (pagination: PaginationDTO): Promise<PromotionalProductsVM> => {
    return await getPromocionalProductsRepository(pagination);
};

export const getProductsPagedListsService = async (search: ProductPagedListSearchDTO): Promise<ProductPagedListVM> => {
    return await getProductsPagedListRepository(search);
};

export const getProductsService = async (search: ProductPagedListSearchDTO): Promise<Products> => {
    return await getProductsRepository(search);
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

export const getPriceListProductsService = async (search: PriceListProductsSearchDTO): Promise<PriceListProductsVM> => {
    return await getPriceListProductsRepository(search);
};

export const updatePriceProductService = async (toUpdate: UpdatePriceProductDTO): Promise<ResponseMessages> => {
    return await updatePriceProductRepository(toUpdate);
};

export const updateAllProductsPriceService = async (toUpdate: UpdateAllPriceProductDTO): Promise<ResponseMessages> => {
    return await updateAllProductsPricetRepository(toUpdate);
};

export const getHomeInfoService = async (search: GetAllCategoriesSearchDTO): Promise<HomeInfoResponse> => {
    let response = new HomeInfoResponse();
    try {
        [response.Categories, response.PromotionalProducts] = await Promise.all([getAllCategoriesService(search), getPromocionalProductsService(search.Pagination)]);
    } catch (error: any) {
        response.setError(error.message || 'Error');
        return response;
    }

    return response;
}
