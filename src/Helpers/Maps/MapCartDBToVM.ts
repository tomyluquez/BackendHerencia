import CartItems from "../../db/Models/Cart/CartItems.model";
import { AddItemCartDTO } from "../../DTO/Cart/AddItemCartDTO";
import { ICartItemsVM } from "../../Interfaces/Cart/ICartItemsVM";

export const mapCartItemsDBToVM = (cartItemDB: CartItems): ICartItemsVM => {
    return {
        Id: cartItemDB.Id,
        ProductName: cartItemDB.Variant.Product.Name,
        Quantity: cartItemDB.Quantity,
        Price: cartItemDB.Variant.Product.Price,
        SizeName: cartItemDB.Variant.Size!.Name
    };
};

export const mapItemCartBodyToDTO = (variantId: number, cartId: number, quantity: number): AddItemCartDTO => {
    return {
        VariantId: variantId,
        CartId: cartId,
        Quantity: quantity
    };
};
