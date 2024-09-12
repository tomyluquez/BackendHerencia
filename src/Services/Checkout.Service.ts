import { CheckoutInfoVM } from "../Models/Checkout/CheckoutVM";
import { getCheckoutInfoRepository } from "../Repositories/Checkout.Repository";

export const getCheckoutInfoService = async (cartId: number): Promise<CheckoutInfoVM> => {
    return await getCheckoutInfoRepository(cartId);
};
