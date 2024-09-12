import CompanyInfo from "../../db/Models/Config/CompanyInfo.model";
import Config from "../../db/Models/Config/Config.model";
import Menu from "../../db/Models/Config/Menu.model";
import { SaveCompanyInfoDTO } from "../../DTO/Config/SaveCompanyInfoDTO";
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
        Href: menuDB.Href
    };
};

export const mapConfigDBToVM = (configDB: Config): IConfigVM => {
    return {
        Id: configDB.Id,
        Name: configDB.Name,
        Value: configDB.value
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
