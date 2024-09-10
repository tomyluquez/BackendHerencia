import Product from "../../db/Models/Products/Product.model";

export interface IProductVariants {
    Id?: number;
    Stock: number;
    Name: string;
    SizeId?: number;
    Product?: Product;
}
