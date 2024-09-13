import PaymentMethod from "../../db/Models/PaymentMethod.model";
import Shipping from "../../db/Models/Shipping/Shipping.model";
import ShippingMethod from "../../db/Models/Shipping/ShippingMethod.model";
import { IPaymentsMethodsVM } from "../../Interfaces/Config/IPaymentMethodsVM";
import { IShippingMethodsVM } from "../../Interfaces/Config/IShippingMethodsVM";

export const mapPaymentMethodsDBToVM = (payments: PaymentMethod): IPaymentsMethodsVM => {
    return {
        Id: payments.Id,
        Name: payments.Name,
        Disccount: payments.Discount
    };
};

export const mapShippingMethodsDBToVM = (shiiping: ShippingMethod): IShippingMethodsVM => {
    return {
        Id: shiiping.Id,
        Name: shiiping.Name,
        Value: shiiping.value
    };
};
