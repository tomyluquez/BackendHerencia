import Product, { ProductAttributes } from "../../db/Models/Products/Product.model";
import Variant from "../../db/Models/Variant.model";
import { IProductDB } from "../../Interfaces/Products/IProductDB";
import { IProductPagedListVM } from "../../Interfaces/Products/IProductPagedList";
import { IProductVM } from "../../Interfaces/Products/IProductVM";
import { IPromotionalProduct } from "../../Interfaces/Products/IPromotionalProducts";

export const mapProductDBToVM = (productDB: Product): IProductVM => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        Price: productDB.Price,
        Description: productDB.Description,
        Variants: productDB.Variants!.map((variant) => {
            return {
                Stock: variant.Stock,
                Name: variant.Size!.Name
            };
        }),
        Images: productDB.Images || [],
        CategoryName: productDB.Category?.Name || "Sin categoria",
        CategoryId: productDB.CategoryId,
        Discount: productDB.Discount,
        Cost: productDB.Cost,
        IsActive: productDB.IsActive
    };
    return product;
};

export const mapPromotionalDBToVM = (productDB: Product): IPromotionalProduct => {
    const product = {
        Id: productDB.Id!,
        Name: productDB.Name,
        Price: productDB.Price,
        Image: productDB.Images ? productDB.Images[0] : "",
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
        Image: productDB.Images ? productDB.Images[0] : "",
        HasStock: productDB.Variants!.some((v) => v.Stock > 0)
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
        IsActive: body.IsActive || true
    };
    return product;
};

// ver como se guardan los productos con FK
export const MapProductVMToProductDB = (productVM: IProductVM): IProductDB => {
    const productDB: IProductDB = {
        Id: productVM.Id || null,
        Name: productVM.Name,
        Price: productVM.Price,
        Cost: productVM.Cost || 0,
        Discount: productVM.Discount || 0,
        Description: productVM.Description || "",
        IsActive: productVM.IsActive || true,
        IsPromotional: productVM.IsPromotional || false,
        CategoryId: productVM.CategoryId,
        Variants: productVM.Variants || []
    };

    return productDB;
};
