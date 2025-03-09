import PaymentMethod from "../../../db/Models/PaymentMethod.model";
import { IPaymentsMethodsVM } from "../../Config/Interfaces/IPaymentMethodsVM";

export const mapPaymentMethodsDBToVM = (payments: PaymentMethod): IPaymentsMethodsVM => {
    return {
        Id: payments.Id,
        Name: payments.Name,
        Disccount: payments.Discount
    };
};