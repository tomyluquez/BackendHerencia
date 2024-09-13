import { Op } from "sequelize";
import Order from "../db/Models/Order/Order.model";
import User from "../db/Models/User.model";
import { OrderSearchDTO } from "../DTO/Orders/OrderSearchDTO";
import { OrderVM } from "../Models/Orders/OrderVM";
import OrderStatus from "../db/Models/Order/OrderStatus.model";
import { Errors } from "../Text/Errors.Messages";
import { mapOrdersDBToVM, mapOrderStatusDBToVM } from "../Helpers/Maps/MapOrders";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { Success } from "../Text/Succes.Messages";
import { OrderStatusVM } from "../Models/Orders/OrderStatusVM";

export const getOrdersRepository = async (search: OrderSearchDTO): Promise<OrderVM> => {
    const response = new OrderVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const orders = await Order.findAll({
        where: {
            ...(search.orderNumber && { OrderNumber: search.orderNumber })
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: ["Name"],
                ...(search.userName && { where: { Name: { [Op.like]: `%${search.userName}%` } } })
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name", "Color"],
                ...(search.statusId && { where: { Id: search.statusId } })
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });

    if (orders.length > 0) {
        response.Items = orders.map(mapOrdersDBToVM);
        response.TotalItems = await getQuantityOders(search);
    } else {
        response.setError(Errors.OrdersNotFound);
    }

    return response;
};

export const getQuantityOders = async (search: OrderSearchDTO): Promise<number> => {
    return await Order.count({
        where: {
            ...(search.orderNumber && { OrderNumber: search.orderNumber })
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: ["Name"],
                ...(search.userName && { where: { Name: { [Op.like]: `%${search.userName}%` } } })
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name"],
                ...(search.statusId && { where: { Id: search.statusId } })
            }
        ]
    });
};

export const getOrderStatusByIdRepository = async (statusId: number): Promise<OrderStatus | null> => {
    return await OrderStatus.findOne({ where: { Id: statusId } });
};

export const changeStatusOrderRepository = async (statusId: number, orderId: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const [affectedRow] = await Order.update({ OrderStatusId: statusId }, { where: { Id: orderId } });

    if (affectedRow > 0) {
        response.setSuccess(Success.StatusChanged);
    } else {
        response.setError(Errors.StatusCahnge);
    }

    return response;
};

export const getOrderStatusRepository = async (): Promise<OrderStatusVM> => {
    const response = new OrderStatusVM();

    const orderStatusDB = await OrderStatus.findAll();

    if (orderStatusDB.length > 0) {
        response.Items = orderStatusDB.map(mapOrderStatusDBToVM);
    } else {
        response.setError(Errors.OrderStatusNotFound);
    }

    return response;
};
