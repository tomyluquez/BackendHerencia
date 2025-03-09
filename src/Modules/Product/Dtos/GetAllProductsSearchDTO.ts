import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface GetAllProductsSearchDTO {
    Name: string;
    Categories: string[];
    IsActive?: boolean | undefined;
    Pagination: PaginationDTO;
}
