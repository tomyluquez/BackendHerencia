import Cart from "../db/Models/Cart/Cart.model";
import CartItems from "../db/Models/Cart/CartItems.model";
import Product from "../db/Models/Products/Product.model";
import Size from "../db/Models/Size.model";
import Variant from "../db/Models/Variant.model";
import { AddItemCartDTO } from "../DTO/Cart/AddItemCartDTO";
import { mapCartItemsDBToVM } from "../Helpers/Maps/MapCartDBToVM";
import { UserCartItemsVM } from "../Models/Cart/UserCartItemsVM";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
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

    if (!variant) {
        response.setError(Errors.Variant);
        return response;
    }

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

    return response;
};

export const quantityItemCartRepository = async (cartId: number, variantId: number): Promise<number> => {
    const cartItems = await CartItems.findAll({
        where: { CartId: cartId, VariantId: variantId }
    });
    return cartItems.reduce((acc, item) => acc + item.Quantity, 0);
};
