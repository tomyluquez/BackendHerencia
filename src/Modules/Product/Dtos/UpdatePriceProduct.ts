export interface UpdatePriceProductDTO {
    ProductId: number;
    Price: number;
    Discount: number;
}

export interface UpdateAllPriceProductDTO {
    Percentage?: number;
    Discount?: number;
    CategoryId?: number;
}
