import { PaginationDTO } from "../PaginationDTO";

export interface PriceListProductsSearchDTO {
    ProductName: string;
    CategoryId: number;
    Pagination: PaginationDTO;
}
