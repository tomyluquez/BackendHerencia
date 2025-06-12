import CartItems from "../../../db/Models/Cart/CartItems.model";
import DiscountCoupon from "../../../db/Models/DiscountCoupon.model";
import PaymentMethod from "../../../db/Models/PaymentMethod.model";
import ShippingMethod from "../../../db/Models/Shipping/ShippingMethod.model";
import { mapPaymentMethodsDBToVM } from "../../PaymentMethod/Helpers/MapPaymentMethods";
import { mapShippingMethodsDBToVM } from "../../ShippingMethod/Helpers/MapShippingMethods";
import { Errors } from "../../Text/Errors.Messages";
import { Success } from "../../Text/Succes.Messages";
import { CheckoutInfoVM } from "../Models/CheckoutVM";
import { DiscountCouponVM } from "../Models/DiscountCouponVM";

export const getCheckoutInfoRepository = async (): Promise<CheckoutInfoVM> => {
    const response = new CheckoutInfoVM();

    const paymentsMethods = await PaymentMethod.findAll();
    const shippingsMethods = await ShippingMethod.findAll();

    response.PaymentsMethods = paymentsMethods.map(mapPaymentMethodsDBToVM);
    response.ShippingMethods = shippingsMethods.map(mapShippingMethodsDBToVM);

    return response;
};

export const findDiscountCouponRepository = async (couponName: string): Promise<DiscountCouponVM> => {
    const response = new DiscountCouponVM();

    const coupon = await DiscountCoupon.findOne({ where: { Name: couponName, IsActive: true } });

    if (coupon) {
        response.Discount = coupon.Discount;
        response.DiscountCouponId = coupon.Id;
        response.setSuccess(Success.DiscountCouponFound);
    } else {
        response.setError(Errors.DiscountCouponNotFound)
    }

    return response;
};
