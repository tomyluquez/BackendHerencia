import { CheckoutInfoVM } from "../Models/Checkout/CheckoutVM";
import { DiscountCouponVM } from "../Models/Checkout/DiscountCouponVM";
import { findDiscountCouponRepository, getCheckoutInfoRepository } from "../Repositories/Checkout.Repository";

export const getCheckoutInfoService = async (cartId: number): Promise<CheckoutInfoVM> => {
    return await getCheckoutInfoRepository(cartId);
};

export const findDiscountCouponService = async (couponName: string): Promise<DiscountCouponVM> => {
    return await findDiscountCouponRepository(couponName);
}
