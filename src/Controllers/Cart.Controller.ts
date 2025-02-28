import { Request, Response } from "express";
import { UserCartItemsVM } from "../Models/Cart/UserCartItemsVM";
import { Errors } from "../Text/Errors.Messages";
import { addItemCartService, deleteItemToCartService, getCartItemsByUserIdService, updateQuantityCartItemService } from "../Services/Cart.Service";
import { mapItemCartBodyToDTO, mapUpdateQuantityItemCartBodyToDTO } from "../Helpers/Maps/MapCart";
import { ResponseMessages } from "./../Models/Errors/ResponseMessages.model";
import { getCartIdByUserId } from "../Repositories/Cart.Repository";
import { ActionCartItemEnum } from "../Enums/action-cart-item";

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
    const { VariantId, Quantity, UserId } = req.body;
    try {
        if (!VariantId || !UserId) {
            throw new Error(Errors.IdRequired);
        }

        if (!Quantity) {
            throw new Error(Errors.QuantityRequired);
        }

        const CartId = await getCartIdByUserId(UserId);
        const bodyParams = mapItemCartBodyToDTO(+VariantId, CartId, +Quantity);

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

export const deleteItemsToCart = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { itemId } = req.body;
    try {
        if (!itemId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await deleteItemToCartService(+itemId);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new UserCartItemsVM();
        response.setError(error.message || Errors.CartItems);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const updateQuantityCartItem = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { Quantity, ItemId, Action } = req.body;
    try {
        if (!ItemId) {
            throw new Error(Errors.IdRequired);
        }
        if (!Quantity) {
            throw new Error(Errors.QuantityRequired);
        }
        if (!Action || ![ActionCartItemEnum.Add, ActionCartItemEnum.Substract].includes(Action)) {
            throw new Error(Errors.ActionRequired);
        }
        const bodyParams = mapUpdateQuantityItemCartBodyToDTO(ItemId, Quantity, Action);
        const response = await updateQuantityCartItemService(bodyParams);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new UserCartItemsVM();
        response.setError(error.message || Errors.CartItems);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};
