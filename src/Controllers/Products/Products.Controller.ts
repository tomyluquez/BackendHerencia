import { Request, Response } from "express";
import { ProductVM } from "../../Models/Products/ProductVM";
import { changeStatusService, getAllProductsService, getProductByIdService, getProductsPagedListsService, getPromocionalProductsService } from "../../Services/Products/Products.Service";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import { Errors } from "../../Text/Errors.Messages";
import { ProductPagedListVM } from "../../Models/Products/ProductPagedListVM";
import { ProductPagedListSearchDTO } from "../../DTO/Products/ProductPagedListSearchDTO";
import { convertedFilters, convertedStatusFilter } from "../../Helpers/Filters/ConvertedFilters";
import { GetAllProductsSearchDTO } from "../../DTO/Products/GetAllProductsSearchDTO";
import { ResponseMessages } from "../../Models/Errors/ResponseMessages.model";

export const getAllProducts = async (req: Request, res: Response): Promise<ProductVM> => {
    const { name, status, page, limit } = req.query;
    const categories = convertedFilters(req.query.categories);
    const IsActive = convertedStatusFilter(status as string);

    const search: GetAllProductsSearchDTO = {
        Name: name as string,
        Categories: categories,
        IsActive,
        Page: page ? Number(page) : 1,
        Limit: limit ? Number(limit) : 10000
    };

    try {
        const response = await getAllProductsService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getPromocionalProducts = async (req: Request, res: Response): Promise<PromotionalProductsVM> => {
    try {
        const response = await getPromocionalProductsService();
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        let response = new PromotionalProductsVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getProductsPagedLists = async (req: Request, res: Response): Promise<ProductPagedListVM> => {
    const { name, page, limit } = req.query;
    const categories = convertedFilters(req.query.categories);
    const sizes = convertedFilters(req.query.sizes);

    const search: ProductPagedListSearchDTO = {
        Name: name as string,
        Categories: categories,
        Sizes: sizes.map((s) => Number(s)),
        Page: page ? Number(page) : 1,
        Limit: limit ? Number(limit) : 10000
    };
    try {
        const response = await getProductsPagedListsService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductPagedListVM();
        response.setError(Errors.Products);
        res.status(500).send(response);
        return response;
    }
};

export const getProductById = async (req: Request, res: Response): Promise<ProductVM> => {
    const { id } = req.query;

    try {
        if (!id) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getProductByIdService(+id);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVM();
        response.setError(error.message || Errors.Products);
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
        response.setError(error.message || Errors.ProductChangeState);
        res.status(500).send(response);
        return response;
    }
};
