import Variant from "../../db/Models/Variant.model";
import { IProductVariantsSearchDTO } from "../../DTO/Variants/IProductVariantsSearchDTO";
import { IProductVariants } from "../../Interfaces/Products/IProductsVariants";

export const mapVariantsProductDBToVM = (VariantDB: Variant): IProductVariants => {
    return {
        Stock: VariantDB.Stock,
        Name: VariantDB.Size?.Name!
    };
};

export const mapQueryProductVariantsSearchToDTO = (query: any): IProductVariantsSearchDTO => {
    return {
        ProductId: +query.productId,
        Page: +query.page || 1,
        Limit: +query.limit || 1000
    };
};
