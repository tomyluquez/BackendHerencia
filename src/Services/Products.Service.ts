import { GetAllProductsSearchDTO } from "../DTO/Products/GetAllProductsSearchDTO";
import { ProductPagedListSearchDTO } from "../DTO/Products/ProductPagedListSearchDTO";
import { existingProductWhitName } from "../Helpers/Validators/ProductsValidators";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { ProductPagedListVM } from "../Models/Products/ProductPagedListVM";
import { ProductVM } from "../Models/Products/ProductVM";
import { PromotionalProductsVM } from "../Models/Products/PromotionalProductsVM.model";
import {
    changeStatusRepsitory,
    getAllProductsRepository,
    getPriceListProductsRepository,
    getProductByIdRepository,
    getProductsPagedListRepository,
    getPromocionalProductsRepository,
    saveProductRepository,
    updateAllProductsPricetRepository,
    updatePriceProductRepository
} from "../Repositories/Products.Repository";
import { Errors } from "../Text/Errors.Messages";
import { IProductVM } from "../Interfaces/Products/IProductVM";
import { PriceListProductsVM } from "../Models/Products/PriceListProductsVM";
import { PaginationDTO } from "../DTO/PaginationDTO";
import { PriceListProductsSearchDTO } from "../DTO/Products/PriceListProductsSearchDTO";
import { UpdateAllPriceProductDTO, UpdatePriceProductDTO } from "../DTO/Products/UpdatePriceProduct";

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

export const getPriceListProductsService = async (search: PriceListProductsSearchDTO): Promise<PriceListProductsVM> => {
    return await getPriceListProductsRepository(search);
};

export const updatePriceProductService = async (toUpdate: UpdatePriceProductDTO): Promise<ResponseMessages> => {
    return await updatePriceProductRepository(toUpdate);
};

export const updateAllProductsPriceService = async (toUpdate: UpdateAllPriceProductDTO): Promise<ResponseMessages> => {
    return await updateAllProductsPricetRepository(toUpdate);
};
