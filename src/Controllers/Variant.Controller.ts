import { Request, Response } from "express";
import { ProductVarinantsVM } from "../Models/Variant/ProductVariantsVM";
import { Errors } from "../Text/Errors.Messages";
import { getProductVariantsService, updateStockService } from "../Services/Variant.Service";
import { mapQueryProductVariantsSearchToDTO } from "../Helpers/Maps/MapVariantsDBToVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";

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

export const updateStock = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { variantId, quantity } = req.body;
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
