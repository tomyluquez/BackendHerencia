import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface SizeListSearchDTO {
    Name: string;
    IsActive?: boolean | undefined;
    Pagination: PaginationDTO;
}
