import { PaginationDTO } from "../../Other/Dtos/PaginationDTO";

export interface OrderSearchDTO {
    customerName?: string;
    orderNumber?: number;
    orderStatus?: number;
    Pagination: PaginationDTO;
    StartDate: Date;
    EndDate: Date
}
