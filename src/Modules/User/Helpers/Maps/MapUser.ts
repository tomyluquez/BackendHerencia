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
        Phone: userProfileDB.Phone || 0,
        Addres: userProfileDB.Addres || "",
        Orders: userProfileDB.Orders?.map((order) => {
            return {
                Id: order.Id,
                OrderNumber: order.OrderNumber,
                Total: order.Total,
                DateCreated: order.DateCreated,
                OrderStatusId: order.OrderStatusId || 0,
                QuantityItems: order.OrderItems?.length || 0
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
