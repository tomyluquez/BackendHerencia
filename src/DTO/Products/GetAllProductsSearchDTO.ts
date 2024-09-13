import { PaginationDTO } from "../PaginationDTO";

export interface GetAllProductsSearchDTO {
    Name: string;
    Categories: string[];
    IsActive?: boolean | undefined;
    Pagination: PaginationDTO;
}
