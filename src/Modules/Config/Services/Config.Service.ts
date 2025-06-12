import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { Errors } from "../../Text/Errors.Messages";
import { SaveCompanyInfoDTO } from "../Dtos/SaveCompanyInfoDTO";
import { SaveConfigDTO } from "../Dtos/SaveConfigDTO";
import { validateDuplicateNameConfig, validateIfExistsCompanyInfoWhitName } from "../Helpers/ConfigValidators";
import { SearchConfigDTO } from "../Interfaces/Config-list.interface";
import { CompanyInfoVM } from "../Models/CompanyInfoVM";
import { ConfigVM } from "../Models/ConfigVM";
import { MenuVM } from "../Models/MenuVM";
import { getCompanyInfoRepository, getConfigRepository, getMenuRepository, saveCompanyInfoRepository, saveConfigRepository } from "../Repositories/Config.Repository";

export const getCompanyInfoService = async (IsActive: boolean | undefined): Promise<CompanyInfoVM> => {
    return await getCompanyInfoRepository(IsActive);
};

export const getMenuService = async (IsAdmin: boolean | undefined): Promise<MenuVM> => {
    return await getMenuRepository(IsAdmin);
};

export const getConfigService = async (search: SearchConfigDTO): Promise<ConfigVM> => {
    return await getConfigRepository(search);
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
