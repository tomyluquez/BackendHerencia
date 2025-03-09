export interface IProductPagedListVM {
    Id: number;
    Name: string;
    CategoryName: string;
    Price: number;
    PromotionalPrice: number;
    Image?: string;
    HasStock: boolean;
    IsActive: boolean;
}
