import { IProductVariantsSearchDTO } from "../DTO/Variants/IProductVariantsSearchDTO";
import { ProductVarinantsVM } from "../Models/Variant/ProductVariantsVM";
import { getProductVariantsRepository } from "../Repositories/Variant.Repository";

export const getProductVariantsService = async (search: IProductVariantsSearchDTO): Promise<ProductVarinantsVM> => {
    return await getProductVariantsRepository(search);
};
