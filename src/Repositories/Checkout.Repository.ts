import CartItems from "../db/Models/Cart/CartItems.model";
import PaymentMethod from "../db/Models/PaymentMethod.model";
import ShippingMethod from "../db/Models/Shipping/ShippingMethod.model";
import { mapPaymentMethodsDBToVM, mapShippingMethodsDBToVM } from "../Helpers/Maps/MapConfig";
import { CheckoutInfoVM } from "../Models/Checkout/CheckoutVM";

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
