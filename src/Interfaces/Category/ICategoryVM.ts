import Product from "../../db/Models/Products/Product.model";
import { IProductVM } from "../Products/IProductVM";

export interface ICategoryVM {
    Id: number;
    Name: string;
    Image: string;
    IsActive?: boolean;
    Products?: Product[];
}
