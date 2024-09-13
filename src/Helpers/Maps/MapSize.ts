import Size from "../../db/Models/Size.model";
import { SaveSizeDTO } from "../../DTO/Size/SaveSizeDTO";
import { SizeChangeStatusDTO } from "../../DTO/Size/SizeChangeStatusDTO";
import { SizeListSearchDTO } from "../../DTO/Size/SizeListSearchDTO";
import { ISizeListVM } from "../../Interfaces/Sizes/ISizeListVM";
import { mapPaginationQueryToDTO } from "./Maps";

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
