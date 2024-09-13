import { PaginationDTO } from "../PaginationDTO";

export interface OrderSearchDTO {
    userName?: string;
    orderNumber?: number;
    statusId?: number;
    Pagination: PaginationDTO;
}
