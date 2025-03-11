import { IProductVariants } from "./IProductsVariants";

export interface IProductDB {
    Id?: number;
    Name: string;
    Price: number;
    PromotionalPrice: number;
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
