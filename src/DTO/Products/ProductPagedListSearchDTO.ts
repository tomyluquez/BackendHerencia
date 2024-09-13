import { PaginationDTO } from "../PaginationDTO";

export interface ProductPagedListSearchDTO {
    Name: string;
    Categories: string[];
    Sizes: number[];
    Pagination: PaginationDTO;
}
