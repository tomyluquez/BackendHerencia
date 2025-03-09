import Product from "../../../db/Models/Products/Product.model";

export interface ICategoryVM {
    Id: number;
    Name: string;
    Image: string;
    IsActive?: boolean;
    Products?: Product[];
}
