import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { IProductVariantsSearchDTO } from "../Dtos/IProductVariantsSearchDTO";
import { SearchProductsStockPagedListDTO } from "../Interfaces/Variants.interfaces";
import { ProductVarinantsVM } from "../Models/ProductVariantsVM";
import { getProductsStockRepository, getProductVariantsRepository, getVariantByIdRepository, updateStockRepository } from "../Repositories/Variant.Repository";

export const getProductVariantsService = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    return await getProductVariantsRepository(search);
};

export const getProductsStockService = async (search: SearchProductsStockPagedListDTO): Promise<ProductVarinantsVM> => {
    return await getProductsStockRepository(search);
};


export const updateStockService = async (variantId: number, quantity: number): Promise<ResponseMessages> => {
    return await updateStockRepository(variantId, quantity);
};

export const stockByVariantIdService = async (variantId: number): Promise<number> => {
    const variant = await getVariantByIdRepository(variantId);
    return variant ? variant.Stock : 0;
};
