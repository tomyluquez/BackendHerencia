import Variant from "../../../../db/Models/Variant.model";
import { NameAndId } from "../../../Other/Interfaces/Name-and-id.interface";
import { IProductVariants } from "../../../Product/Interfaces/IProductsVariants";
import { convertedStatusNumberFilter } from "../../../Other/Helpers/ConvertedFilters";
import { IProductsStock, SearchProductsStockPagedListDTO } from "../../Interfaces/Variants.interfaces";
import { IProductVariantsSearchDTO } from "../../Dtos/IProductVariantsSearchDTO";
import { mapPaginationQueryToDTO } from "../../../Other/Helpers/Maps/Maps";
import { SizeVM } from "../../../Size/Models/SizeVM";
import { ISizeListVM } from "../../../Size/Interfaces/ISizeListVM";

export const mapVariantsProductDBToVM = (VariantDB: Variant): IProductVariants => {
    return {
        Id: VariantDB.Id,
        Stock: VariantDB.Stock,
        Name: VariantDB.Size?.Name!,
        SizeId: VariantDB.SizeId,
        Product: VariantDB.Product,
        ProductId: VariantDB.ProductId
    };
};

export const mapProductsStockDBToVM = (VariantDB: Variant): IProductsStock => {
    return {
        Id: VariantDB.Id,
        Stock: VariantDB.Stock,
        Name: VariantDB.Size?.Name!,
        SizeId: VariantDB.SizeId,
        ProductId: VariantDB.ProductId,
        ProductName: VariantDB.Product.Name,
        ValuedStock: VariantDB.Product.Cost * VariantDB.Stock || 0
    };
};

export const mapQueryProductVariantsSearchToDTO = (query: any): IProductVariantsSearchDTO => {
    return {
        ProductId: +query.productId,
        Pagination: mapPaginationQueryToDTO(query)
    };
};

export const mapQueryProductsStockSearchToDTO = (query: any): SearchProductsStockPagedListDTO => {
    return {
        ProductName: query.productName as string,
        Pagination: mapPaginationQueryToDTO(query),
        Status: convertedStatusNumberFilter(Number(query.status)),
        SizeId: Number(query.sizeId),
        CategoryId: Number(query.categoryId)
    };
};

export const mapDataToNameAndId = (categories: any): NameAndId[] => {
    return categories.map((item: any) => ({ Name: item.Name, Id: item.Id }));
}

export const mapVariantDBToSize = (variant: Variant): ISizeListVM => {
    return {
        Id: variant.SizeId,
        Name: variant.Size?.Name || "",
        IsActive: variant.Size?.IsActive || false
    }
}

