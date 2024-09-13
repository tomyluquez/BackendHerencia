import Order from "../../db/Models/Order/Order.model";
import OrderStatus from "../../db/Models/Order/OrderStatus.model";
import { OrderSearchDTO } from "../../DTO/Orders/OrderSearchDTO";
import { IOrderStatusVM } from "../../Interfaces/Orders/IOrderStatusVM";
import { IOrderVM } from "../../Interfaces/Orders/IOrderVM";
import { mapPaginationQueryToDTO } from "./Maps";

export const mapOrderSearchQueryToDTO = (params: any): OrderSearchDTO => {
    return {
        userName: params.userName,
        orderNumber: +params.orderNumber,
        statusId: +params.statusId,
        Pagination: mapPaginationQueryToDTO(params)
    };
};

export const mapOrdersDBToVM = (order: Order): IOrderVM => {
    return {
        OrderNumber: order.OrderNumber,
        DateCreated: order.DateCreated,
        customerName: order.User.Name,
        Status: {
            Name: order.OrderStatus.Name,
            Color: order.OrderStatus.Color
        }
    };
};

export const mapOrderStatusDBToVM = (orderStatus: OrderStatus): IOrderStatusVM => {
    return {
        Id: orderStatus.Id,
        Name: orderStatus.Name
    };
};
