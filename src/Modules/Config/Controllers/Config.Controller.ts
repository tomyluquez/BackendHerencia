import { Request, Response } from "express";
import { CompanyInfoVM } from "../Models/CompanyInfoVM";
import { Errors } from "../../Text/Errors.Messages";
import { getCompanyInfoService, getConfigService, getMenuService, saveCompanyInfoService, saveConfigService } from "../Services/Config.Service";
import { MenuVM } from "../Models/MenuVM";
import { ConfigVM } from "../Models/ConfigVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { convertedStatusFilter, convertedUserRoleFilter } from "../../Other/Helpers/ConvertedFilters";
import { mapSaveCompanyInfoBodyToDTO, mapSaveConfigBodyToDTO } from "../../Other/Helpers/Maps/MapCompanyInfo";

export const getCompanyInfo = async (req: Request, res: Response): Promise<CompanyInfoVM> => {
    const { status } = req.query;
    const IsActive = convertedStatusFilter(status as string);
    try {
        const response = await getCompanyInfoService(IsActive);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new CompanyInfoVM();
        response.setError(Errors.CompanyInfo);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const getMenu = async (req: Request, res: Response): Promise<MenuVM> => {
    const { userRole } = req.query;
    const IsAdmin = convertedUserRoleFilter(Number(userRole));
    try {
        const response = await getMenuService(IsAdmin);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new MenuVM();
        response.setError(Errors.Menu);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const getConfig = async (req: Request, res: Response): Promise<ConfigVM> => {
    try {
        const response = await getConfigService();
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new ConfigVM();
        response.setError(Errors.Config);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const saveCompanyInfo = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const body = req.body;
    body.IsActive = convertedStatusFilter(body.IsActive as string);
    const bodyParams = mapSaveCompanyInfoBodyToDTO(body);

    try {
        const response = await saveCompanyInfoService(bodyParams);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.CompanyInfo);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const saveConfigInfo = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const body = req.body.config;
    const bodyParamsArray = mapSaveConfigBodyToDTO(body);

    try {
        const response = await saveConfigService(bodyParamsArray);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.Config);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};
