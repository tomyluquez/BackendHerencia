import { stockByVariantIdService } from "../../../Variant/Services/Variant.Service";
import { getItemCartByICartIdRepository, getQuantityItemCartRepository } from "../../Repositories/Cart.Repository";

export const hasStockValidator = async (VariantId: number, CartId: number, Quantity: number): Promise<boolean> => {
    let prevStock;
    const item = await getItemCartByICartIdRepository(CartId, VariantId);
    const limitStock = await stockByVariantIdService(VariantId);
    if (!item) {
        prevStock = 0;
    } else {
        prevStock = item.Quantity;
    }
    return limitStock - (prevStock + Quantity) >= 0;
};

export const substractQuantityValidator = async (itemId: number, Quantity: number): Promise<number> => {
    const prevStock = await getQuantityItemCartRepository(itemId);
    console.log(prevStock)
    console.log(Quantity)
    return prevStock - Quantity;
};
