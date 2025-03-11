import { Request, Response } from "express";
import { ProductVarinantsVM } from "../Models/ProductVariantsVM";
import { Errors } from "../../Text/Errors.Messages";
import { getProductVariantsService, getProductsStockService, updateStockService } from "../Services/Variant.Service";
import { mapDataToNameAndId, mapQueryProductsStockSearchToDTO, mapQueryProductVariantsSearchToDTO } from "../Helpers/Maps/MapVariantsDBToVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { FilteringOptionsProductStockVM } from "../Models/FilteringOptionsProductStockVM";
import { getAllCategoriesService } from "../../Category/Services/Categories.Service";
import { getSizesListService } from "../../Size/Services/Size.Service";

export const getProductVariants = async (req: Request, res: Response): Promise<ProductVarinantsVM> => {
    const { productId } = req.query;
    try {
        if (!productId) {
            throw new Error(Errors.IdRequired);
        }
        const search = mapQueryProductVariantsSearchToDTO(req.query);
        const response = await getProductVariantsService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVarinantsVM();
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
        return response;
    }
};

export const getProductsStock = async (req: Request, res: Response): Promise<ProductVarinantsVM> => {
    try {

        const search = mapQueryProductsStockSearchToDTO(req.query);
        const response = await getProductsStockService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVarinantsVM();
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
        return response;
    }
};

export const getFilteringOptionsProductStock = async (req: Request, res: Response): Promise<FilteringOptionsProductStockVM> => {
    const response = new FilteringOptionsProductStockVM();
    try {
        const categories = await getAllCategoriesService({ IsActive: true, Pagination: { Page: 1, Limit: 1000 }, Name: "" })
        const sizes = await getSizesListService({ Name: "", IsActive: true, Pagination: { Page: 1, Limit: 1000 } })
        response.addCategories(mapDataToNameAndId(categories.Items))
        response.addSizes(mapDataToNameAndId(sizes.Items))
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
        return response;
    }
};

export const updateStock = async (req: Request, res: Response): Promise<ResponseMessages> => {
    console.log(req.query)
    const { variantId, quantity } = req.query;
    try {
        if (!variantId) {
            throw new Error(Errors.IdRequired);
        }

        if (!quantity) {
            throw new Error(Errors.QuantityRequired);
        }

        const response = await updateStockService(+variantId, +quantity!);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new ProductVarinantsVM();
        response.setError(error.message || Errors.UpdateStock);
        res.status(500).send(response);
        return response;
    }
};
