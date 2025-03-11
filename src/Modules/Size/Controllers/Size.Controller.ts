import { Request, Response } from "express";
import { SizeLlistVM } from "../Models/SizeListVM";
import { mapSaveSizeBodyToDTO, mapSizeChangeStatusBodyToDTO, mapSizeListSearchQueryToDTO } from "../Helpers/Maps/MapSize";
import { Errors } from "../../Text/Errors.Messages";
import { changeStatusService, getSizeByIdService, getSizesListService, saveSizeService } from "../Services/Size.Service";
import { convertedStatusFilter, convertedStatusNumberFilter } from "../../Other/Helpers/ConvertedFilters";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { SizeVM } from "../Models/SizeVM";
import { FilteringOptionsCategoryListVM } from "../Models/FilteringOptionsSizeList";

export const getSizesList = async (req: Request, res: Response): Promise<SizeLlistVM> => {
    const IsActive = convertedStatusNumberFilter(Number(req.query.status));
    const search = mapSizeListSearchQueryToDTO(req.query, IsActive);

    try {
        const response = await getSizesListService(search);
        res.status(200).send(response);
        return response;
    } catch (error) {
        const response = new SizeLlistVM();
        response.setError(Errors.Size);
        res.status(500).send(response);
        return response;
    }
};

export const changeStatus = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { id } = req.query;
    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const toUpdate = mapSizeChangeStatusBodyToDTO(+id);
        const response = await changeStatusService(toUpdate);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new SizeLlistVM();
        response.setError(error.message || Errors.SizeChangeStatus);
        res.status(500).send(response);
        return response;
    }
};

export const saveSize = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const saveParams = mapSaveSizeBodyToDTO(req.body);
    console.log(saveParams)
    try {
        const response = await saveSizeService(saveParams);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(Errors.SizeSave);
        res.status(500).send(response);
        return response;
    }
};

export const getSizeById = async (req: Request, res: Response): Promise<SizeVM> => {
    const { id } = req.query;
    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getSizeByIdService(+id);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new SizeVM();
        response.setError(error.message || Errors.Size);
        res.status(500).send(response);
        return response;
    }
};

export const getFilteringOptionsSizeList = async (req: Request, res: Response): Promise<FilteringOptionsCategoryListVM> => {
    const response = new FilteringOptionsCategoryListVM();
    try {
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        response.setError(error.message);
        res.status(500).send(response);
        return response;
    }
};