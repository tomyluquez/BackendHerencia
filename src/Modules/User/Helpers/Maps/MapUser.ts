import User from "../../../../db/Models/User.model";
import { UserLoginDTO } from "../../Dtos/UserLoginDTO";
import { UserRegisterDTO } from "../../Dtos/UserRegisterDTO";
import { UserRoleEnum } from "../../Enums/user-role-enum";
import { IUserProfileVM } from "../../Interfaces/IUserProfileVM";

export const mapUserProfileDBToVM = (userProfileDB: User): IUserProfileVM => {
    return {
        Id: userProfileDB.Id,
        Name: userProfileDB.Name,
        Image: userProfileDB.Image,
        Mail: userProfileDB.Email,
        DateCreated: userProfileDB.DateCreated,
        Orders:
            userProfileDB.Orders?.map((order) => {
                return {
                    Id: order.Id,
                    OrderNumber: order.OrderNumber,
                    Total: order.Total,
                    Subtotal: order.Subtotal,
                    Discount: order.DiscountCouponTotal,
                    DiscountCoupon: order.DiscountCoupon?.Name,
                    DateCreated: order.DateCreated,
                    OrderStatus: order.OrderStatus?.Name || "",
                    PaymentMethod: order.PaymentMethod?.Name,
                    ShippingMethod: order.ShippingMethod?.Name,
                    CustomerName: order.User?.Name || "",
                    Details: order.OrderItems!.map((orderItem) => {
                        return {
                            Id: orderItem.Id,
                            Name: orderItem.Variant!.Product.Name,
                            UnitPrice: orderItem.UnitPrice,
                            TotalPrice: orderItem.TotalPrice,
                            Quantity: orderItem.Quantity,
                            SizeName: orderItem.Variant!.Size!.Name,
                            SizeId: orderItem.Variant!.Size!.Id,
                            VariantId: orderItem.Variant!.Id
                        };
                    })
                };
            }) || []
    };
};

export const mapUserRegisterBodyToDTO = (userName: string, email: string, pass: string, role: number): UserRegisterDTO => {
    return {
        Name: userName,
        Email: email,
        Password: pass,
        Role: role || UserRoleEnum.Customer
    };
};

export const mapUserLoginBodyToDTO = (email: string, pass: string): UserLoginDTO => {
    return {
        Email: email,
        Password: pass
    };
};
