import Order from "../../../../db/Models/Order/Order.model";
import OrderStatus from "../../../../db/Models/Order/OrderStatus.model";
import { mapPaginationQueryToDTO } from "../../../Other/Helpers/Maps/Maps";
import { OrderSearchDTO } from "../../Dtos/OrderSearchDTO";
import { IOrderDetailVM } from "../../Interfaces/IOrderDetailVM";
import { IOrderStatusVM } from "../../Interfaces/IOrderStatusVM";
import { IOrderVM } from "../../Interfaces/IOrderVM";

export const mapOrderSearchQueryToDTO = (params: any): OrderSearchDTO => {
    return {
        customerName: params.customerName,
        orderNumber: +params.orderNumber,
        orderStatus: +params.orderStatus,
        Pagination: mapPaginationQueryToDTO(params),
        StartDate: new Date(params.startDate),
        EndDate: new Date(params.endDate)
    };
};

export const mapOrdersDBToVM = (order: Order): IOrderVM => {
    return {
        Id: order.Id,
        OrderNumber: order.OrderNumber,
        DateCreated: order.DateCreated,
        CustomerName: order.User.Name,
        OrderStatusId: order.OrderStatusId
    };
};

export const mapOrderStatusDBToVM = (orderStatus: OrderStatus): IOrderStatusVM => {
    return {
        Id: orderStatus.Id,
        Name: orderStatus.Name,
        Color: orderStatus.Color
    };
};

export const mapOrderDetailDBToVm = (order: Order): IOrderDetailVM => {
    return {
        Id: order.Id,
        OrderNumber: order.OrderNumber,
        Total: order.Total,
        Subtotal: order.Subtotal,
        Discount: order.Discount,
        DiscountCoupon: order.DiscountCoupon?.Name || "Sin cupon de descuento",
        DateCreated: order.DateCreated,
        OrderStatus: order.OrderStatus?.Name || "Estado no encontrado",
        PaymentMethod: order.PaymentMethod?.Name || "Sin método de pago",
        ShippingMethod: order.ShippingMethod?.Name || "Sin método de envío",
        CustomerName: order.User.Name,
        Details: order.OrderItems?.map((orderItem) => {
            return {
                Id: orderItem.Id,
                Name: orderItem.Variant?.Product?.Name || "Nombre no encontrado",
                Quantity: orderItem.Quantity,
                UnitPrice: orderItem.UnitPrice,
                TotalPrice: orderItem.TotalPrice,
                Size: orderItem.Variant?.Size?.Name || "Talle no encontrado"
            };
        }) || []
    };
};

