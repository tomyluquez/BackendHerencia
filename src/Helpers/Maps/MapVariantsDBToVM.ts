import Variant from "../../db/Models/Variant.model";
import { IProductVariantsSearchDTO } from "../../DTO/Variants/IProductVariantsSearchDTO";
import { IProductVariants } from "../../Interfaces/Products/IProductsVariants";
import { mapPaginationQueryToDTO } from "./Maps";

export const mapVariantsProductDBToVM = (VariantDB: Variant): IProductVariants => {
    return {
        Id: VariantDB.Id,
        Stock: VariantDB.Stock,
        Name: VariantDB.Size?.Name!,
        SizeId: VariantDB.SizeId,
        Product: VariantDB.Product
    };
};

export const mapQueryProductVariantsSearchToDTO = (query: any): IProductVariantsSearchDTO => {
    return {
        ProductId: +query.productId,
        Pagination: mapPaginationQueryToDTO(query)
    };
};
