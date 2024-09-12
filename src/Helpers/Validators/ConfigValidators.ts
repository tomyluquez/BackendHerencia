import { getCompanyInfoIdByNameRepository } from "../../Repositories/Config.Repository";

export const validateIfExistsCompanyInfoWhitName = async (name: string, companyInfoId = 0): Promise<boolean> => {
    const existingConfig = await getCompanyInfoIdByNameRepository(name.toLowerCase());

    if (!existingConfig) return false;

    return existingConfig !== companyInfoId;
};
