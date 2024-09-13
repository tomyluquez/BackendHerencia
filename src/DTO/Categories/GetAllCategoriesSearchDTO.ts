import { PaginationDTO } from "../PaginationDTO";

export interface GetAllCategoriesSearchDTO {
    IsActive?: boolean;
    Pagination: PaginationDTO;
}
