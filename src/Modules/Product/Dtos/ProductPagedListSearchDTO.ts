import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface ProductPagedListSearchDTO {
    Name: string;
    Categories: string[];
    Sizes: number[];
    Pagination: PaginationDTO;
    Order: string;
    Status: boolean | undefined;
}
