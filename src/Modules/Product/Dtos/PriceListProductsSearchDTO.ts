import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface PriceListProductsSearchDTO {
    ProductName: string;
    CategoryId: number;
    Pagination: PaginationDTO;
}
