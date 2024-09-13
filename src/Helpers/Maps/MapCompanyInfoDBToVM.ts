import CompanyInfo from "../../db/Models/Config/CompanyInfo.model";
import Config from "../../db/Models/Config/Config.model";
import Menu from "../../db/Models/Config/Menu.model";
import { SaveCompanyInfoDTO } from "../../DTO/Config/SaveCompanyInfoDTO";
import { SaveConfigDTO } from "../../DTO/Config/SaveConfigDTO";
import { ICompanyInfoVM } from "../../Interfaces/Config/ICompanyInfoVM";
import { IConfigVM } from "../../Interfaces/Config/IConfigVM";
import { IMenuVM } from "../../Interfaces/Config/IMenuVM";

export const mapCompanyInfoDBToVM = (companyInfoDB: CompanyInfo): ICompanyInfoVM => {
    return {
        Id: companyInfoDB.Id,
        Name: companyInfoDB.Name,
        Value: companyInfoDB.Value,
        Icon: companyInfoDB.Icon,
        IsActive: companyInfoDB.IsActive
    };
};

export const mapMenuDBToVM = (menuDB: Menu): IMenuVM => {
    return {
        Name: menuDB.Name,
        Icon: menuDB.Icon,
        Href: menuDB.Href,
        IsAdmin: menuDB.IsAdmin
    };
};

export const mapConfigDBToVM = (configDB: Config): IConfigVM => {
    return {
        Id: configDB.Id,
        Name: configDB.Name,
        Value: configDB.Value
    };
};

export const mapSaveCompanyInfoBodyToDTO = (body: any): SaveCompanyInfoDTO => {
    return {
        Id: body.Id || 0,
        Name: body.Name,
        Value: body.Value,
        Icon: body.Icon,
        IsActive: body.IsActive
    };
};

export const mapSaveConfigBodyToDTO = (body: any[]): SaveConfigDTO[] => {
    return body.map((config) => {
        const dto: SaveConfigDTO = {
            Name: config.Name,
            Value: config.Value
        };
        if (config.Id) {
            dto.Id = config.Id;
        }

        return dto;
    });
};
