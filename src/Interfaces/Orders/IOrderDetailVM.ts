import { IOrderStatusVM } from "./IOrderStatusVM";
import PaymentMethod from "./../../db/Models/PaymentMethod.model";
import { IPaymentsMethodsVM } from "../Config/IPaymentMethodsVM";

export interface IOrderDetailVM {
    OrderNumber: number;
    Total: number;
    DateCreated: Date;
    OrderStatus: IOrderStatusVM;
    PaymentMethod: string;
    ShippingMethod: string;
    Details: Detail[];
}

interface Detail {
    ProductName: string;
    UnitPrice: number;
    Quantity: number;
}
