import { IProductVariants } from "./IProductsVariants";

export interface IProductDB {
    Id?: number | null;
    Name: string;
    Price: number;
    Cost: number;
    Discount: number;
    Description?: string;
    IsActive?: boolean;
    IsPromotional?: boolean;
    CategoryId: number;
    DateUpdated?: Date;
    DateCreated?: Date;
    Variants: IProductVariants[];
}
