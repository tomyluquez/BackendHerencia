import Size from "../../../../db/Models/Size.model";
import { mapPaginationQueryToDTO } from "../../../Other/Helpers/Maps/Maps";
import { SaveSizeDTO } from "../../Dtos/SaveSizeDTO";
import { SizeChangeStatusDTO } from "../../Dtos/SizeChangeStatusDTO";
import { SizeListSearchDTO } from "../../Dtos/SizeListSearchDTO";
import { ISizeListVM } from "../../Interfaces/ISizeListVM";

export const mapSizeListSearchQueryToDTO = (query: any, IsActive: boolean | undefined): SizeListSearchDTO => {
    return {
        Name: query.name,
        IsActive: IsActive,
        Pagination: mapPaginationQueryToDTO(query)
    };
};

export const mapSizesDBToVM = (size: Size): ISizeListVM => {
    return {
        Id: size.Id,
        Name: size.Name,
        IsActive: size.IsActive
    };
};

export const mapSizeChangeStatusBodyToDTO = (id: number, IsActive: boolean | undefined): SizeChangeStatusDTO => {
    return {
        Id: Number(id),
        IsActive: IsActive
    };
};

export const mapSaveSizeBodyToDTO = (body: any): SaveSizeDTO => {
    return {
        Id: Number(body.id) || 0,
        Name: body.name
    };
};
