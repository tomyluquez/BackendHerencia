import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface SearchProductsStockPagedListDTO {
    ProductName: string;
    Pagination: PaginationDTO;
    Status: boolean | undefined;
    SizeId: number
    CategoryId: number
}

export interface IProductsStock {
    Id?: number;
    Stock: number;
    Name: string;
    SizeId?: number;
    ProductId: number;
    ProductName?: string;
    ValuedStock: number;
}