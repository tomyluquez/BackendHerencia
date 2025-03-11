import { Op } from "sequelize";
import { SizeListSearchDTO } from "../Dtos/SizeListSearchDTO";
import { SizeLlistVM } from "../Models/SizeListVM";
import Size from "../../../db/Models/Size.model";
import { mapSizesDBToVM } from "../Helpers/Maps/MapSize";
import { Errors } from "../../Text/Errors.Messages";
import { SizeChangeStatusDTO } from "../Dtos/SizeChangeStatusDTO";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { Success } from "../../Text/Succes.Messages";
import sequelize from "../../../db/connectionDB.sequalize";
import { SaveSizeDTO } from "../Dtos/SaveSizeDTO";
import { SizeVM } from "../Models/SizeVM";

export const getSizesListRepository = async (search: SizeListSearchDTO): Promise<SizeLlistVM> => {
    const response = new SizeLlistVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const sizesDB = await Size.findAll({
        where: {
            ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
            ...(search.IsActive !== undefined && { IsActive: search.IsActive })
        },
        offset,
        limit: search.Pagination.Limit
    });
    if (sizesDB.length > 0) {
        response.Items = sizesDB.map(mapSizesDBToVM);
        response.TotalItems = await Size.count({
            where: {
                ...(search.Name && { Name: { [Op.like]: `%${search.Name}%` } }),
                ...(search.IsActive !== undefined && { IsActive: search.IsActive })
            }
        });
    } else {
        response.setError(Errors.Size);
    }

    return response;
};

export const changeStatusRepository = async (toUpdate: SizeChangeStatusDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const [affectedRow] = await Size.update(
        { IsActive: sequelize.literal('NOT IsActive') }, // Valores a actualizar
        { where: { Id: toUpdate.Id } } // Condición de búsqueda
    );

    if (affectedRow > 0) {
        response.setSuccess(Success.StatusChanged);
    } else {
        response.setError(Errors.StatusCahnge);
    }

    return response;
};

export const getSizeIdByNameRepository = async (Name: string): Promise<number> => {
    const sizeDB = await Size.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Name")), Name)]
        }
    });
    if (sizeDB) {
        return sizeDB.Id;
    }
    return 0;
};

export const saveSizeRepository = async (toSave: SaveSizeDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    if (toSave.Id) {
        const [affectedRow] = await Size.update(
            {
                Name: toSave.Name,
            },
            {
                where: {
                    Id: toSave.Id
                }
            }
        );
        if (affectedRow > 0) {
            response.setSuccess(Success.UpdateSize);
        } else {
            response.setError(Errors.SizeSave);
        }
    } else {
        const newSize = await Size.create(toSave);
        if (newSize) {
            response.setSuccess(Success.SaveSize);
        } else {
            response.setError(Errors.SizeSave);
        }
    }

    return response;
};

export const getSizeByIdRepository = async (id: number): Promise<SizeVM> => {
    const response = new SizeVM();

    const sizeDB = await Size.findOne({
        where: {
            Id: id
        }
    });
    if (sizeDB) {
        response.Item = mapSizesDBToVM(sizeDB);
    } else {
        response.setError(Errors.SizeNotFound);
    }
    return response;
};
