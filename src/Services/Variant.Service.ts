import { IProductVariantsSearchDTO } from "../DTO/Variants/IProductVariantsSearchDTO";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { ProductVarinantsVM } from "../Models/Variant/ProductVariantsVM";
import { getProductVariantsRepository, getVariantByIdRepository, updateStockRepository } from "../Repositories/Variant.Repository";

export const getProductVariantsService = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    return await getProductVariantsRepository(search);
};

export const updateStockService = async (variantId: number, quantity: number): Promise<ResponseMessages> => {
    return await updateStockRepository(variantId, quantity);
};

export const stockByVariantIdService = async (variantId: number): Promise<number> => {
    const variant = await getVariantByIdRepository(variantId);
    return variant ? variant.Stock : 0;
};
