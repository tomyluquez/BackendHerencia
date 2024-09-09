import { Request, Response } from "express";
import { changeStatusService, getAllCategoriesService, getCategoryByIdService, saveCategoryService } from "../Services/Categories.Service";
import { CategoryListVM } from "../Models/Category/CategoryListVM";
import { CategoryVM } from "../Models/Category/CategoryVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { Errors } from "../Text/Errors.Messages";
import { GetAllCategoriesSearchDTO } from "../DTO/Categories/GetAllCategoriesSearchDTO";
import { convertedStatusFilter } from "../Helpers/Filters/ConvertedFilters";

export const getAllCategories = async (req: Request, res: Response): Promise<CategoryListVM> => {
    const { status, page, limit } = req.query;
    const IsActive = convertedStatusFilter(status as string);

    const search: GetAllCategoriesSearchDTO = {
        IsActive,
        Page: page ? Number(page) : 1,
        Limit: limit ? Number(limit) : 10000
    };

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
