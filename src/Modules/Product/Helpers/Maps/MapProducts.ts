import Product from "../../../../db/Models/Products/Product.model";
import Variant from "../../../../db/Models/Variant.model";
import { PaginationEnum } from "../../../Other/Enums/pagination-enum";
import { mapPaginationQueryToDTO } from "../../../Other/Helpers/Maps/Maps";
import { GetAllProductsSearchDTO } from "../../Dtos/GetAllProductsSearchDTO";
import { PriceListProductsSearchDTO } from "../../Dtos/PriceListProductsSearchDTO";
import { ProductPagedListSearchDTO } from "../../Dtos/ProductPagedListSearchDTO";
import { UpdateAllPriceProductDTO, UpdatePriceProductDTO } from "../../Dtos/UpdatePriceProduct";
import { IPriceListProducts } from "../../Interfaces/IPriceListProductsVM";
import { IProductDB } from "../../Interfaces/IProductDB";
import { IProductPagedListVM } from "../../Interfaces/IProductPagedList";
import { IProductVM } from "../../Interfaces/IProductVM";
import { IPromotionalProduct } from "../../Interfaces/IPromotionalProducts";

export const mapProductDBToVM = (productDB: Product): IProductVM => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        Price: productDB.Price,
        Description: productDB.Description,
        Variants: productDB.Variants!.map((variant) => {
            return {
                Stock: variant.Stock,
                Name: variant.Size!.Name,
                SizeId: variant.Size!.Id,
                Id: variant.Id,
                ProductId: variant.ProductId
            };
        }),
        Images: productDB.Images?.map((image) => image.Url) || [],
        CategoryName: productDB.Category?.Name || "Sin categoria",
        CategoryId: productDB.CategoryId,
        Discount: productDB.Discount,
        Cost: productDB.Cost,
        IsActive: productDB.IsActive,
        IsPromotional: productDB.IsPromotional,
        PromotionalPrice: productDB.PromotionalPrice
    };
    return product;
};

export const mapPromotionalDBToVM = (productDB: Product): IPromotionalProduct => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        Price: productDB.Price,
        Image: productDB.Images && productDB.Images.length > 0 ? productDB.Images[0].Url : "",
        CategoryName: productDB.Category?.Name || "Sin categoria"
    };
    return product;
};

export const mapProductDBToProductPagedListVM = (productDB: Product): IProductPagedListVM => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        CategoryName: productDB.Category?.Name || "Sin categoria",
        Price: productDB.Price,
        Image: productDB.Images && productDB.Images.length > 0 ? productDB.Images[0].Url : "",
        HasStock: productDB.Variants!.some((v) => v.Stock > 0),
        IsActive: productDB.IsActive,
        PromotionalPrice: productDB.PromotionalPrice
    };
    return product;
};

export const MapBodyToProductDB = (body: any): IProductVM => {
    const product = {
        Id: body.Id ? body.Id : null,
        Name: body.Name,
        Price: body.Price,
        Description: body.Description,
        Variants: body.Variants!.map((variant: Variant) => {
            return {
                Stock: variant.Stock,
                Name: variant.Size!.Name
            };
        }),
        Images: body.Images || [],
        CategoryName: null,
        CategoryId: body.CategoryId,
        Discount: body.Discount,
        Cost: body.Cost,
        IsActive: body.IsActive || true,
        IsPromotional: body.IsPromotional || false,
        PromotionalPrice: body.PromotionalPrice
    };
    return product;
};

// ver como se guardan los productos con FK
export const MapProductVMToProductDB = (productVM: IProductVM): IProductDB => {
    const productDB: IProductDB = {
        Id: productVM.Id || null,
        Name: productVM.Name,
        Price: productVM.Price,
        PromotionalPrice: productVM.PromotionalPrice,
        Cost: productVM.Cost || 0,
        Discount: productVM.Discount || 0,
        Description: productVM.Description || "",
        IsActive: productVM.IsActive,
        IsPromotional: productVM.IsPromotional || false,
        CategoryId: productVM.CategoryId,
        Variants: productVM.Variants || []
    };

    return productDB;
};

export const mapPriceListProductsDBToVM = (productDB: Product): IPriceListProducts => {
    return {
        ProductName: productDB.Name,
        Price: productDB.Price,
        Discount: productDB.Discount
    };
};

export const mapGetAllProductsQueryToDTO = (name: string, IsActive: boolean | undefined, categories: string[], page: string, limit: string): GetAllProductsSearchDTO => {
    return {
        Name: name as string,
        Categories: categories,
        IsActive,
        Pagination: {
            Page: page ? Number(page) : 1,
            Limit: limit ? Number(limit) : 10000
        }
    };
};

export const mapProductPagedListQueryToDTO = (query: any, categories: string[], sizes: string[], status: boolean | undefined): ProductPagedListSearchDTO => {
    return {
        Name: query.name as string,
        Categories: categories,
        Sizes: sizes.map((s) => Number(s)),
        Order: query.order as string,
        Pagination: {
            Page: query.page ? Number(query.page) : PaginationEnum.Page,
            Limit: query.limit ? Number(query.limit) : PaginationEnum.Limit
        },
        Status: status
    };
};

export const mapPriceListProductsSearchQueryToDTO = (query: any): PriceListProductsSearchDTO => {
    return {
        Pagination: mapPaginationQueryToDTO(query),
        ProductName: query.productName as string,
        CategoryId: Number(query.category) || 0
    };
};

export const mapUpdatePriceProductBodyToDTO = (body: any): UpdatePriceProductDTO => {
    return {
        ProductId: Number(body.productId),
        Price: Number(body.price),
        Discount: Number(body.discount)
    };
};

export const mapUpdateAllPriceProductBodyToDTO = (body: any): UpdateAllPriceProductDTO => {
    return {
        Percentage: Number(body.percentage) || 0,
        Discount: Number(body.discount) || 0,
        CategoryId: Number(body.categoryId) || 0
    };
};
