import Product from "../../db/Models/Products/Product.model";
import { IProductPagedListVM } from "../../Interfaces/Products/IProductPagedList";
import { IProductVM } from "../../Interfaces/Products/IProductVM";
import { IPromotionalProduct } from "../../Interfaces/Products/IPromotionalProducts";

export const mapProductDBToVM = (productDB: Product): IProductVM => {
    const product = {
        Id: productDB.Id,
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
        Id: productDB.Id,
        Name: productDB.Name,
        Price: productDB.Price,
        Image: productDB.Images ? productDB.Images[0] : "",
        CategoryName: productDB.Category?.Name || "Sin categoria"
    };
    return product;
};

export const mapProductDBToProductPagedListVM = (productDB: Product): IProductPagedListVM => {
    const product = {
        Id: productDB.Id,
        Name: productDB.Name,
        CategoryName: productDB.Category?.Name || "Sin categoria",
        Price: productDB.Price,
        Image: productDB.Images ? productDB.Images[0] : "",
        HasStock: productDB.Variants!.some((v) => v.Stock > 0)
    };
    return product;
};
