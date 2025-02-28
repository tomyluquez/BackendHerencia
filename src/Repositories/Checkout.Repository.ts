import CartItems from "../db/Models/Cart/CartItems.model";
import DiscountCoupon from "../db/Models/DiscountCoupon.model";
import PaymentMethod from "../db/Models/PaymentMethod.model";
import ShippingMethod from "../db/Models/Shipping/ShippingMethod.model";
import { mapPaymentMethodsDBToVM, mapShippingMethodsDBToVM } from "../Helpers/Maps/MapConfig";
import { CheckoutInfoVM } from "../Models/Checkout/CheckoutVM";
import { DiscountCouponVM } from "../Models/Checkout/DiscountCouponVM";
import { Errors } from "../Text/Errors.Messages";
import { Success } from "../Text/Succes.Messages";

export const getCheckoutInfoRepository = async (cartId: number): Promise<CheckoutInfoVM> => {
    const response = new CheckoutInfoVM();

    const paymentsMethods = await PaymentMethod.findAll();
    const shippingsMethods = await ShippingMethod.findAll();
    const subtotal = await CartItems.sum("TotalPrice", { where: { CartId: cartId } });

    response.PaymentsMethods = paymentsMethods.map(mapPaymentMethodsDBToVM);
    response.ShippingMethods = shippingsMethods.map(mapShippingMethodsDBToVM);
    response.SubtotalToPaid = subtotal || 0;

    return response;
};

export const findDiscountCouponRepository = async (couponName: string): Promise<DiscountCouponVM> => {
    const response = new DiscountCouponVM();
    console.log(couponName)
    const coupon = await DiscountCoupon.findOne({ where: { Name: couponName, IsActive: true } });

    if (coupon) {
        response.Discount = coupon.Discount;
        response.setSuccess(Success.DiscountCouponFound);
    } else {
        response.setError(Errors.DiscountCouponNotFound)
    }

    return response;
};
