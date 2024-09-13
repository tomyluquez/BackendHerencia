import { Request, Response } from "express";
import { changeStatusService, getAllCategoriesService, getCategoryByIdService, saveCategoryService } from "../Services/Categories.Service";
import { CategoryListVM } from "../Models/Category/CategoryListVM";
import { CategoryVM } from "../Models/Category/CategoryVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { Errors } from "../Text/Errors.Messages";
import { convertedStatusFilter } from "../Helpers/Filters/ConvertedFilters";
import { mapCategoriesSearchQueryToDTO } from "../Helpers/Maps/MapCategory";

export const getAllCategories = async (req: Request, res: Response): Promise<CategoryListVM> => {
    const { status } = req.query;
    const IsActive = convertedStatusFilter(status as string);

    const search = mapCategoriesSearchQueryToDTO(req.query, IsActive);

    try {
        const response = await getAllCategoriesService(search); // Obtener la respuesta directamente del servicio
        res.status(200).send(response);
        return response;
    } catch (error) {
        const response = new CategoryListVM(); // Crear una instancia solo en caso de error
        response.setError(Errors.Categories);
        res.status(500).send(response);
        return response;
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<CategoryVM> => {
    try {
        const { id } = req.query;
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getCategoryByIdService(+id);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new CategoryVM();
        response.setError(error.message || Errors.Categories);
        res.status(500).send(response);
        return response;
    }
};

export const changeStatuts = async (req: Request, res: Response): Promise<ResponseMessages> => {
    try {
        const { status, id } = req.body;
        let IsActive;

        if (!status || (status !== "active" && status !== "inactive")) {
            throw new Error(Errors.StatusRequired);
        } else {
            IsActive = status === "active" ? true : false;
        }

        if (!id) {
            throw new Error(Errors.IdRequired);
        }

        const response = await changeStatusService(+id, IsActive);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.CategoryChangeState);
        res.status(500).send(response);
        return response;
    }
};

export const saveCategory = async (req: Request, res: Response): Promise<ResponseMessages> => {
    try {
        const response = await saveCategoryService(req.body);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ResponseMessages();
        response.setError(error.message || Errors.CategorySave);
        res.status(500).send(response);
        return response;
    }
};
