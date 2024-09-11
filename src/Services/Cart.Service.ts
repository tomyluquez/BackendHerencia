import { AddItemCartDTO } from "../DTO/Cart/AddItemCartDTO";
import { UpdateQuantityItemCartDTO } from "../DTO/Cart/UpdateQuantityItemCartDTO";
import { hasStockValidator, substractQuantityValidator } from "../Helpers/Validators/CartItemsValidators";
import { UserCartItemsVM } from "../Models/Cart/UserCartItemsVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { addItemCartRepository, deleteItemToCartRepository, getCartItemsByUserIdRepository, getItemCartByIdRepository, updateQuantityCartItemRepository } from "../Repositories/Cart.Repository";
import { Errors } from "../Text/Errors.Messages";
import { stockByVariantIdService } from "./Variant.Service";

export const getCartItemsByUserIdService = async (userId: number): Promise<UserCartItemsVM> => {
    //comprobar primero si el usuario existe, sino, devolver error de que no existe el usuario.
    return await getCartItemsByUserIdRepository(userId);
};

export const addItemCartService = async (bodyParams: AddItemCartDTO): Promise<ResponseMessages> => {
    //comprobar si hay stock suficiente.
    const hasStock = await hasStockValidator(bodyParams.VariantId, bodyParams.CartId, bodyParams.Quantity);
    if (!hasStock) {
        const response = new ResponseMessages();
        response.setError(Errors.HasNotStock);
        return response;
    }
    return await addItemCartRepository(bodyParams);
};

export const deleteItemToCartService = async (itemId: number): Promise<ResponseMessages> => {
    return await deleteItemToCartRepository(itemId);
};

export const updateQuantityCartItemService = async (bodyParams: UpdateQuantityItemCartDTO): Promise<ResponseMessages> => {
    const itemCart = await getItemCartByIdRepository(bodyParams.ItemId);
    if (!itemCart) {
        const response = new ResponseMessages();
        response.setError(Errors.CartItemNotFound);
        return response;
    }

    if (bodyParams.Action === "add") {
        const hasStock = await hasStockValidator(itemCart.VariantId, itemCart.CartId, bodyParams.Quantity);
        if (!hasStock) {
            const response = new ResponseMessages();
            response.setError(Errors.HasNotStock);
            return response;
        }
    }

    if (bodyParams.Action === "substract") {
        const rest = await substractQuantityValidator(itemCart.Id, bodyParams.Quantity);
        if (rest < 0) {
            const response = new ResponseMessages();
            response.setError(Errors.NotSubstract);
            return response;
        }
        if (rest === 0) {
            return await deleteItemToCartRepository(bodyParams.ItemId);
        }
    }

    return await updateQuantityCartItemRepository(bodyParams);
};
