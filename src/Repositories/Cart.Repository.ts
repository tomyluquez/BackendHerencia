import sequelize from "../db/connectionDB.sequalize";
import Cart from "../db/Models/Cart/Cart.model";
import CartItems from "../db/Models/Cart/CartItems.model";
import Product from "../db/Models/Products/Product.model";
import Size from "../db/Models/Size.model";
import Variant from "../db/Models/Variant.model";
import { AddItemCartDTO } from "../DTO/Cart/AddItemCartDTO";
import { UpdateQuantityItemCartDTO } from "../DTO/Cart/UpdateQuantityItemCartDTO";
import { mapCartItemsDBToVM } from "../Helpers/Maps/MapCartDBToVM";
import { UserCartItemsVM } from "../Models/Cart/UserCartItemsVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { updateQuantityCartItemService } from "../Services/Cart.Service";
import { Errors } from "../Text/Errors.Messages";
import { Success } from "../Text/Succes.Messages";
import { getVariantByIdRepository } from "./Variant.Repository";

export const getCartItemsByUserIdRepository = async (userId: number): Promise<UserCartItemsVM> => {
    const response = new UserCartItemsVM();

    const userCart = await Cart.findOne({
        where: { UserId: userId, IsFinish: false }
    });

    if (!userCart) {
        response.setError(Errors.CartUserNotFound);
        return response;
    }

    const cartItemsDB = await CartItems.findAll({
        where: { CartId: userCart.Id },
        include: [
            {
                model: Variant,
                as: "Variant",
                include: [
                    {
                        model: Size,
                        as: "Size",
                        attributes: ["Name"]
                    },
                    {
                        model: Product,
                        as: "Product",
                        attributes: ["Name", "Price"]
                    }
                ]
            }
        ]
    });

    if (cartItemsDB.length > 0) {
        response.Items = cartItemsDB.map(mapCartItemsDBToVM);
    } else {
        response.setError(Errors.CartEmpty);
    }
    return response;
};

export const addItemCartRepository = async (bodyParams: AddItemCartDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const variant = await getVariantByIdRepository(bodyParams.VariantId);
    const item = await getItemCartByICartIdRepository(bodyParams.CartId, bodyParams.VariantId);

    if (!variant) {
        response.setError(Errors.Variant);
        return response;
    }

    if (!item) {
        const newCartItem = await CartItems.create({
            Quantity: bodyParams.Quantity,
            UnitPrice: variant.Product!.Price,
            TotalPrice: variant.Product!.Price * bodyParams.Quantity,
            CartId: bodyParams.CartId,
            VariantId: bodyParams.VariantId
        });

        if (!newCartItem) {
            response.setError(Errors.CartItem);
        } else {
            response.setSuccess(Success.AddCartItem);
        }
    } else {
        return await updateQuantityCartItemRepository({
            Quantity: bodyParams.Quantity,
            ItemId: item.Id,
            Action: "add"
        });
    }

    return response;
};
export const deleteItemToCartRepository = async (itemId: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    await CartItems.destroy({ where: { Id: itemId } });
    response.setSuccess(Success.RemoveCartItem);
    return response;
};

export const getItemCartByIdRepository = async (itemId: number): Promise<CartItems | null> => {
    return await CartItems.findOne({ where: { Id: itemId } });
};

export const getQuantityItemCartRepository = async (Id: number): Promise<number> => {
    const item = await CartItems.findOne({ where: { Id }, attributes: ["Quantity"] });
    return item?.Quantity || 0;
};

export const getItemCartByICartIdRepository = async (cartId: number, variantId: number): Promise<CartItems | null> => {
    return await CartItems.findOne({
        where: { CartId: cartId, VariantId: variantId }
    });
};

export const updateQuantityCartItemRepository = async (bodyParams: UpdateQuantityItemCartDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();
    const item = await getItemCartByIdRepository(bodyParams.ItemId);

    // Calcular la nueva cantidad en función de la acción
    const newQuantity =
        bodyParams.Action === "add"
            ? item!.Quantity + bodyParams.Quantity // Sumar cantidad
            : item!.Quantity - bodyParams.Quantity; // Restar cantidad

    const newTotalPrice = (item!.TotalPrice = item!.UnitPrice * newQuantity);

    const [affectedRows] = await CartItems.update({ Quantity: newQuantity, TotalPrice: newTotalPrice }, { where: { Id: item!.Id } });

    if (!affectedRows) {
        response.setError(Errors.CartItem);
    } else {
        response.setSuccess(Success.UpdateQuantityCartItem);
    }

    return response;
};
