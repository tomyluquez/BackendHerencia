import { AddItemCartDTO } from "../DTO/Cart/AddItemCartDTO";
import { UserCartItemsVM } from "../Models/Cart/UserCartItemsVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { addItemCartRepository, getCartItemsByUserIdRepository, quantityItemCartRepository } from "../Repositories/Cart.Repository";
import { Errors } from "../Text/Errors.Messages";
import { stockByVariantIdService } from "./Variant.Service";

export const getCartItemsByUserIdService = async (userId: number): Promise<UserCartItemsVM> => {
    //comprobar primero si el usuario existe, sino, devolver error de que no existe el usuario.
    return await getCartItemsByUserIdRepository(userId);
};

export const addItemCartService = async (bodyParams: AddItemCartDTO): Promise<ResponseMessages> => {
    //comprobar si hay stock suficiente.
    const limitStock = await stockByVariantIdService(bodyParams.VariantId);
    const prevStock = await quantityItemCartRepository(bodyParams.CartId, bodyParams.VariantId);
    const hasStock = limitStock - (prevStock + bodyParams.Quantity);
    if (hasStock < 0) {
        const response = new ResponseMessages();
        response.setError(Errors.HasNotStock);
        return response;
    }
    return await addItemCartRepository(bodyParams);
};
