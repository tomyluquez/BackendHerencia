import { Request, Response } from "express";
import { UserCartItemsVM } from "../Models/Cart/UserCartItemsVM";
import { Errors } from "../Text/Errors.Messages";
import { addItemCartService, getCartItemsByUserIdService } from "../Services/Cart.Service";
import { mapItemCartBodyToDTO } from "../Helpers/Maps/MapCartDBToVM";
import { ResponseMessages } from "./../Models/Errors/ResponseMessages.model";

export const getCartItemsByUserId = async (req: Request, res: Response): Promise<UserCartItemsVM> => {
    const { userId } = req.query;

    try {
        if (!userId) {
            throw new Error(Errors.IdRequired);
        }

        const response = await getCartItemsByUserIdService(+userId);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new UserCartItemsVM();
        response.setError(error.message || Errors.CartItems);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const AddItemToCart = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { variantId, quantity, cartId } = req.body;
    try {
        if (!variantId || !cartId) {
            throw new Error(Errors.IdRequired);
        }

        if (!quantity) {
            throw new Error(Errors.QuantityRequired);
        }

        const bodyParams = mapItemCartBodyToDTO(+variantId, +cartId, +quantity);

        const response = await addItemCartService(bodyParams);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new UserCartItemsVM();
        response.setError(error.message || Errors.CartItems);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};
