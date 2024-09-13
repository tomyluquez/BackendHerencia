import { Request, Response } from "express";
import { OrderVM } from "../Models/Orders/OrderVM";
import { Errors } from "../Text/Errors.Messages";
import { mapOrderSearchQueryToDTO } from "../Helpers/Maps/MapOrders";
import { changeStatusOrderService, getOrdersService, getOrderStatusService } from "../Services/Order.Service";
import { ResponseMessages } from "../Models/Errors/ResponseMessages.model";
import { OrderStatusVM } from "../Models/Orders/OrderStatusVM";

export const getOrders = async (req: Request, res: Response): Promise<OrderVM> => {
    const search = mapOrderSearchQueryToDTO(req.query);
    try {
        const response = await getOrdersService(search);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new OrderVM();
        response.setError(error.message || Errors.Orders);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const changeStatusOrder = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { statusId, orderId } = req.body;
    try {
        if (!statusId || !orderId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await changeStatusOrderService(+statusId, +orderId);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new OrderVM();
        response.setError(error.message || Errors.OrderChangeStatus);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const getOrderStatus = async (req: Request, res: Response): Promise<OrderStatusVM> => {
    try {
        const response = await getOrderStatusService();
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new OrderStatusVM();
        response.setError(Errors.OrderStatus);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};
