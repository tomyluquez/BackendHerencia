import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { Errors } from "../../Text/Errors.Messages";
import { SaveSizeDTO } from "../Dtos/SaveSizeDTO";
import { SizeChangeStatusDTO } from "../Dtos/SizeChangeStatusDTO";
import { SizeListSearchDTO } from "../Dtos/SizeListSearchDTO";
import { validateHasProductsWhitSize, validateIfExistsSizeWhitName } from "../Helpers/Validators/SizeValidators";
import { SizeLlistVM } from "../Models/SizeListVM";
import { SizeVM } from "../Models/SizeVM";
import { changeStatusRepository, getSizeByIdRepository, getSizesListRepository, saveSizeRepository } from "../Repositories/Size.Repository";

export const getSizesListService = async (search: SizeListSearchDTO): Promise<SizeLlistVM> => {
    return await getSizesListRepository(search);
};

export const changeStatusService = async (toUpdate: SizeChangeStatusDTO): Promise<ResponseMessages> => {
    const hasProducts = await validateHasProductsWhitSize(toUpdate.Id);
    if (hasProducts) {
        const response = new ResponseMessages();
        response.setError(Errors.SizeWhitProducts);
        return response;
    }
    return await changeStatusRepository(toUpdate);
};

export const saveSizeService = async (toSave: SaveSizeDTO): Promise<ResponseMessages> => {
    const existingSizeWhitName = await validateIfExistsSizeWhitName(toSave.Name, toSave.Id);

    if (existingSizeWhitName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }

    return await saveSizeRepository(toSave);
};

export const getSizeByIdService = async (id: number): Promise<SizeVM> => {
    return await getSizeByIdRepository(id);
};
