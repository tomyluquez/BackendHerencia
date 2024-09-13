import { PaginationDTO } from "../../DTO/PaginationDTO";

export const mapPaginationQueryToDTO = (query: any): PaginationDTO => {
    return {
        Page: Number(query.page) || 1,
        Limit: Number(query.limit) || 10000
    };
};
