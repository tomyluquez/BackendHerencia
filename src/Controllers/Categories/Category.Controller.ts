import { Request, Response } from "express";
import {
    changeStatusService,
    getActivesCategoriesService,
    getCategoryByIdService,
    saveCategoryService
} from "../../Services/Categories/Categories.Service";
import { CategoryListVM } from "../../Models/Category/CategoryListVM";
import { CategoryVM } from "../../Models/Category/CategoryVM";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";
import { Errors } from "../../Helpers/Errors/Messages";

export const getActivesCategories = async (req: Request, res: Response): Promise<CategoryListVM> => {
    const { status } = req.query;

    const IsActive = status === undefined || status === "" ? undefined : status === "active";
    try {
        const response = await getActivesCategoriesService(IsActive); // Obtener la respuesta directamente del servicio
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
            throw new Error("El id es requerido");
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
            throw new Error("El status es requerido");
        } else {
            IsActive = status === "active" ? true : false;
        }

        if (!id) {
            throw new Error("El id es requerido");
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
    console.log(req.body);
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
