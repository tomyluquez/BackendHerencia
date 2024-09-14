import { Op } from "sequelize";
import Order from "../db/Models/Order/Order.model";
import OrderItems from "../db/Models/Order/OrderItems.model";
import OrderStatus from "../db/Models/Order/OrderStatus.model";
import PaymentMethod from "../db/Models/PaymentMethod.model";
import Product from "../db/Models/Products/Product.model";
import ShippingMethod from "../db/Models/Shipping/ShippingMethod.model";
import User from "../db/Models/User.model";
import Variant from "../db/Models/Variant.model";
import { mapUserProfileDBToVM } from "../Helpers/Maps/MapUser";
import { UserProfileVM } from "../Models/User/UserProfileVM";
import { Errors } from "../Text/Errors.Messages";
import sequelize from "../db/connectionDB.sequalize";
import { UserRegisterDTO } from "../DTO/User/UserRegisterDTO";
import jwt from "jsonwebtoken";
import { UserTokenVM } from "../Models/User/UserRegisterVM";
import { Success } from "../Text/Succes.Messages";
import bcrypt from "bcryptjs";
import { UserLoginDTO } from "../DTO/User/UserLoginDTO";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";

export const getUserProfileRepository = async (UserId: number): Promise<UserProfileVM> => {
    const response = new UserProfileVM();

    const userProfileDB = await User.findOne({
        where: { Id: UserId },
        attributes: ["Id", "Name", "Image", "Email", "DateCreated"],
        include: [
            {
                model: Order,
                as: "Orders",
                attributes: ["OrderNumber", "DateCreated", "Total"],
                include: [
                    {
                        model: PaymentMethod,
                        as: "PaymentMethod",
                        attributes: ["Name"]
                    },
                    {
                        model: ShippingMethod,
                        as: "ShippingMethod",
                        attributes: ["Name"]
                    },
                    {
                        model: OrderStatus,
                        as: "OrderStatus"
                    },
                    {
                        model: OrderItems,
                        as: "OrderItems",
                        attributes: ["Quantity"],
                        include: [
                            {
                                model: Variant,
                                as: "Variant",
                                attributes: ["SizeId", "ProductId"],
                                include: [
                                    {
                                        model: Product,
                                        as: "Product",
                                        attributes: ["Name", "Price"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });

    if (userProfileDB) {
        response.Item = mapUserProfileDBToVM(userProfileDB);
    } else {
        response.setError(Errors.UserProfile);
    }

    return response;
};

export const getUserIdByEmailRepository = async (Email: string): Promise<number> => {
    const userBM = await User.findOne({
        where: {
            [Op.and]: [sequelize.where(sequelize.fn("LOWER", sequelize.col("Email")), Email)]
        },
        attributes: ["Id"]
    });
    if (userBM) {
        return userBM.Id!;
    } else {
        return 0;
    }
};

export const registerUserRepository = async (newUser: UserRegisterDTO): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const newUserDB = await User.create(newUser);
    if (newUserDB) {
        response.setSuccess(Success.UserRegister);
    } else {
        response.setError(Errors.UserRegister);
    }
    return response;
};

export const loginUserRepository = async (loginUser: UserLoginDTO): Promise<UserTokenVM> => {
    const response = new UserTokenVM();

    const userDB = await User.findOne({ where: { Email: loginUser.Email } });

    if (!userDB) {
        response.setError(Errors.UserEmailAndPassLogin);
        return response;
    }
    const isMatchPass = await bcrypt.compare(loginUser.Password, userDB.Password);
    if (!isMatchPass) {
        response.setError(Errors.UserEmailAndPassLogin);
        return response;
    }

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: userDB.Id, username: userDB.Name, role: userDB.Role }, secretKey!, { expiresIn: "15d" });
    response.Token = token;
    response.Role = userDB.Role;
    response.setSuccess(Success.UserLogin);

    return response;
};
