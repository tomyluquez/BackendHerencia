import { Op } from "sequelize";
import CompanyInfo from "../db/Models/Config/CompanyInfo.model";
import Config from "../db/Models/Config/Config.model";
import Menu from "../db/Models/Config/Menu.model";
import { mapCompanyInfoDBToVM, mapConfigDBToVM, mapMenuDBToVM } from "../Helpers/Maps/MapCompanyInfoDBToVM";
import { CompanyInfoVM } from "../Models/Config/CompanyInfoVM";
import { ConfigVM } from "../Models/Config/ConfigVM";
import { MenuVM } from "../Models/Config/MenuVM";
import { Errors } from "../Text/Errors.Messages";
import sequelize from "../db/connectionDB.sequalize";
import { SaveCompanyInfoDTO } from "../DTO/Config/SaveCompanyInfoDTO";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { Success } from "../Text/Succes.Messages";

export const getCompanyInfoRepository = async (IsActive: boolean | undefined): Promise<CompanyInfoVM> => {
    const response = new CompanyInfoVM();
    let filters: any = {};

    if (IsActive !== undefined) {
        filters = { IsActive };
    }

    const companyInfoDB = await CompanyInfo.findAll({ where: filters });

    if (companyInfoDB.length > 0) {
        response.Items = companyInfoDB.map(mapCompanyInfoDBToVM);
    } else {
        response.setError(Errors.CompanyInfoNotFound);
    }

    return response;
};

export const getMenuRepository = async (): Promise<MenuVM> => {
    const response = new MenuVM();

    const menuDB = await Menu.findAll();
    if (menuDB.length > 0) {
        response.Items = menuDB.map(mapMenuDBToVM);
    } else {
        response.setError(Errors.MenuNotFound);
    }

    return response;
};

export const getConfigRepository = async (): Promise<ConfigVM> => {
    const response = new ConfigVM();

    const configDB = await Config.findAll();
    if (configDB.length > 0) {
        response.Items = configDB.map(mapConfigDBToVM);
    } else {
        response.setError(Errors.ConfigNotFound);
    }

    return response;
};

export const saveCompanyInfoRepository = async (bodyParams: SaveCompanyInfoDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    if (!bodyParams.Id) {
        const newCompanyInfo = await CompanyInfo.create(bodyParams);
        if (newCompanyInfo) {
            response.setSuccess(Success.SaveCompanyInfo);
        } else {
            response.setError(Errors.CompanySave);
        }
    } else {
        const [affectedRow] = await CompanyInfo.update(bodyParams, {
            where: {
                Id: bodyParams.Id
            }
        });
        if (affectedRow > 0) {
            response.setSuccess(Success.UpdateCompanyInfo);
        } else {
            response.setError(Errors.CompanySave);
        }
    }
    return response;
};

export const getCompanyInfoIdByNameRepository = async (Name: string): Promise<number> => {
    const companyInfoDB = await CompanyInfo.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Name")), Name)]
        }
    });
    if (companyInfoDB) {
        return companyInfoDB.Id!;
    } else {
        return 0;
    }
};
