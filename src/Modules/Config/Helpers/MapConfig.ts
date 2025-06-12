import { mapPaginationQueryToDTO } from "../../Other/Helpers/Maps/Maps";
import { SearchConfigDTO } from "../Interfaces/Config-list.interface";

export const mapQueryConfigSearchToDTO = (query: any): SearchConfigDTO => {
    return {
        Pagination: mapPaginationQueryToDTO(query),
    };
};