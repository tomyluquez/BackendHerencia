import { SaveSizeDTO } from "../DTO/Size/SaveSizeDTO";
import { SizeChangeStatusDTO } from "../DTO/Size/SizeChangeStatusDTO";
import { SizeListSearchDTO } from "../DTO/Size/SizeListSearchDTO";
import { validateIfExistsSizeWhitName } from "../Helpers/Validators/SizeValidators";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { SizeLlistVM } from "../Models/Size/SizeListVM";
import { SizeVM } from "../Models/Size/SizeVM";
import { changeStatusRepository, getSizeByIdRepository, getSizeIdByNameRepository, getSizesListRepository, saveSizeRepository } from "../Repositories/Size.Repository";
import { Errors } from "../Text/Errors.Messages";

export const getSizesListService = async (search: SizeListSearchDTO): Promise<SizeLlistVM> => {
    return await getSizesListRepository(search);
};

export const changeStatusService = async (toUpdate: SizeChangeStatusDTO): Promise<ResponseMessages> => {
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
