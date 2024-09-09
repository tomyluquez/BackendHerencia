import { Request, Response } from "express";
import { ProductVarinantsVM } from "../Models/Variant/ProductVariantsVM";
import { Errors } from "../Text/Errors.Messages";
import { getProductVariantsService } from "../Services/Variant.Service";
import { mapQueryProductVariantsSearchToDTO } from "../Helpers/Maps/MapVariantsDBToVM";

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
