import { CheckoutInfoVM } from "../Models/CheckoutVM";
import { DiscountCouponVM } from "../Models/DiscountCouponVM";
import { findDiscountCouponRepository, getCheckoutInfoRepository } from "../Repositories/Checkout.Repository";

export const getCheckoutInfoService = async (): Promise<CheckoutInfoVM> => {
    return await getCheckoutInfoRepository();
};

export const findDiscountCouponService = async (couponName: string): Promise<DiscountCouponVM> => {
    return await findDiscountCouponRepository(couponName);
}
