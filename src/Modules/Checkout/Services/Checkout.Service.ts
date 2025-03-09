import { CheckoutInfoVM } from "../Models/CheckoutVM";
import { DiscountCouponVM } from "../Models/DiscountCouponVM";
import { findDiscountCouponRepository, getCheckoutInfoRepository } from "../Repositories/Checkout.Repository";

export const getCheckoutInfoService = async (cartId: number): Promise<CheckoutInfoVM> => {
    return await getCheckoutInfoRepository(cartId);
};

export const findDiscountCouponService = async (couponName: string): Promise<DiscountCouponVM> => {
    return await findDiscountCouponRepository(couponName);
}
