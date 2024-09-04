import { Request, Response } from "express";
import { ProductVM } from "../../Models/Products/ProductVM";
import {
    getAllProductsService,
    getProductsPagedListsService,
    getPromocionalProductsService
} from "../../Services/Products/Products.Service";
import { PromotionalProductsVM } from "../../Models/Products/PromotionalProductsVM.model";
import { Errors } from "../../Helpers/Errors/Messages";
import { ProductPagedListVM } from "../../Models/Products/ProductPagedListVM";
import { ProductPagedListSearchDTO } from "../../DTO/Products/ProductPagedListSearchDTO";
import { convertedFilters } from "../../Helpers/Filters/ConverterFilters";

export const getAllProducts = async (req: Request, res: Response): Promise<ProductVM> => {
    const { name, status } = req.query;
    const categories = convertedFilters(req.query.categories);
    const IsActive = status === undefined || status === "" ? undefined : status === "active";

    try {
        const response = await getAllProductsService(name as string, categories, IsActive);
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
    const { name } = req.query;
    const categories = convertedFilters(req.query.categories);
    const sizes = convertedFilters(req.query.sizes);

    const search: ProductPagedListSearchDTO = {
        name: name as string,
        categories,
        sizes: sizes.map((s) => Number(s))
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
