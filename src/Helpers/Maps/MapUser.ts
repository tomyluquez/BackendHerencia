import Order from "../../db/Models/Order/Order.model";
import User from "../../db/Models/User.model";
import { UserLoginDTO } from "../../DTO/User/UserLoginDTO";
import { UserRegisterDTO } from "../../DTO/User/UserRegisterDTO";
import { RoleEnum } from "../../Enums/role-enum";
import { IUserProfileVM } from "../../Interfaces/User/IUserProfileVM";
import OrderStatus from "./../../db/Models/Order/OrderStatus.model";

export const mapUserProfileDBToVM = (userProfileDB: User): IUserProfileVM => {
    return {
        Id: userProfileDB.Id,
        Name: userProfileDB.Name,
        Image: userProfileDB.Image,
        Mail: userProfileDB.Email,
        DateCreated: userProfileDB.DateCreated,
        Oders:
            userProfileDB.Orders?.map((order) => {
                return {
                    OrderNumber: order.OrderNumber,
                    Total: order.Total,
                    DateCreated: order.DateCreated,
                    OrderStatus: {
                        Name: order.OrderStatus.Name,
                        Color: order.OrderStatus.Color
                    },
                    PaymentMethod: order.PaymentMethod!.Name,
                    ShippingMethod: order.ShippingMethod!.Name,
                    Details: order.OrderItems!.map((orderItem) => {
                        return {
                            ProductName: orderItem.Variant!.Product.Name,
                            UnitPrice: orderItem.Variant!.Product.Price,
                            Quantity: orderItem.Quantity
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
        Role: role || RoleEnum.Customer
    };
};

export const mapUserLoginBodyToDTO = (email: string, pass: string): UserLoginDTO => {
    return {
        Email: email,
        Password: pass
    };
};
