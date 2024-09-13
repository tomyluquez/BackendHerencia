import { PaginationDTO } from "../PaginationDTO";

export interface SizeListSearchDTO {
    Name: string;
    IsActive?: boolean | undefined;
    Pagination: PaginationDTO;
}
