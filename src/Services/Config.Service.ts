import { SaveCompanyInfoDTO } from "../DTO/Config/SaveCompanyInfoDTO";
import { SaveConfigDTO } from "../DTO/Config/SaveConfigDTO";
import { validateDuplicateNameConfig, validateIfExistsCompanyInfoWhitName } from "../Helpers/Validators/ConfigValidators";
import { CompanyInfoVM } from "../Models/Config/CompanyInfoVM";
import { ConfigVM } from "../Models/Config/ConfigVM";
import { MenuVM } from "../Models/Config/MenuVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { getCompanyInfoRepository, getConfigRepository, getMenuRepository, saveCompanyInfoRepository, saveConfigRepository } from "../Repositories/Config.Repository";
import { Errors } from "../Text/Errors.Messages";

export const getCompanyInfoService = async (IsActive: boolean | undefined): Promise<CompanyInfoVM> => {
    return await getCompanyInfoRepository(IsActive);
};

export const getMenuService = async (IsAdmin: boolean | undefined): Promise<MenuVM> => {
    return await getMenuRepository(IsAdmin);
};

export const getConfigService = async (): Promise<ConfigVM> => {
    return await getConfigRepository();
};

export const saveCompanyInfoService = async (bodyParams: SaveCompanyInfoDTO): Promise<ResponseMessages> => {
    const isDuplicatedName = await validateIfExistsCompanyInfoWhitName(bodyParams.Name, bodyParams.Id);
    if (isDuplicatedName) {
        const response = new ResponseMessages();
        response.setError(Errors.ExistingName);
        return response;
    }
    return await saveCompanyInfoRepository(bodyParams);
};

export const saveConfigService = async (bodyParams: SaveConfigDTO[]): Promise<ResponseMessages> => {
    const duplicatedNames = validateDuplicateNameConfig(bodyParams);
    if (duplicatedNames) {
        const response = new ResponseMessages();
        response.setError(Errors.ConfigDuplicatedName);
        return response;
    }
    return await saveConfigRepository(bodyParams);
};
