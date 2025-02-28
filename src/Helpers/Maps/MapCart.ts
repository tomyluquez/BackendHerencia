import CartItems from "../../db/Models/Cart/CartItems.model";
import { AddItemCartDTO } from "../../DTO/Cart/AddItemCartDTO";
import { UpdateQuantityItemCartDTO } from "../../DTO/Cart/UpdateQuantityItemCartDTO";
import { ICartItemsVM } from "../../Interfaces/Cart/ICartItemsVM";

export const mapCartItemsDBToVM = (cartItemDB: CartItems): ICartItemsVM => {
    return {
        Id: cartItemDB.Id,
        ProductName: cartItemDB.Variant.Product.Name,
        Quantity: cartItemDB.Quantity,
        Price: cartItemDB.Variant.Product.Price,
        SizeName: cartItemDB.Variant.Size!.Name,
        Stock: cartItemDB.Variant.Stock,
        VariantId: cartItemDB.Variant.Id,
        UrlImage: cartItemDB.Variant.Product.Images && cartItemDB.Variant.Product.Images.length > 0 ? cartItemDB.Variant.Product.Images[0].Url : ""
    };
};

export const mapItemCartBodyToDTO = (variantId: number, cartId: number, quantity: number): AddItemCartDTO => {
    return {
        VariantId: variantId,
        CartId: cartId,
        Quantity: quantity
    };
};

export const mapUpdateQuantityItemCartBodyToDTO = (itemId: number, quantity: number, action: number): UpdateQuantityItemCartDTO => {
    return {
        Quantity: +quantity,
        ItemId: +itemId,
        Action: +action
    };
};
