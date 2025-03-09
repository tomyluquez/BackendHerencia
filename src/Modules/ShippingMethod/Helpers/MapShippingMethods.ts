import ShippingMethod from "../../../db/Models/Shipping/ShippingMethod.model";
import { IShippingMethodsVM } from "../../Config/Interfaces/IShippingMethodsVM";

export const mapShippingMethodsDBToVM = (shiiping: ShippingMethod): IShippingMethodsVM => {
    return {
        Id: shiiping.Id,
        Name: shiiping.Name,
        Value: shiiping.value
    };
};