import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface GetAllCategoriesSearchDTO {
    Name: string;
    IsActive?: boolean;
    Pagination: PaginationDTO;
}
