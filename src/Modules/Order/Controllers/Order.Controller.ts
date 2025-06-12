import { Request, Response } from "express";
import { OrderVM } from "../Models/OrderVM";
import { mapOrderSearchQueryToDTO } from "../Helpers/Maps/MapOrders";
import { changeStatusOrderService, getOrderDetailByIdService, getOrdersService, getOrderStatusService, saveOrderService } from "../Services/Order.Service";
import { Errors } from "../../Text/Errors.Messages";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { OrderStatusVM } from "../Models/OrderStatusVM";
import { FilteringOptionsOrderPagedListVM } from "../Models/FilteringOptionsOrderPagedListVM";
import { convertedStringToBoolean } from "../../Other/Helpers/ConvertedFilters";
import { OrderDetailVM } from "../Models/OrderDetailVM";
import { SaveOrderResponse } from "../Models/SaveOrderResponse.model";
import { IOrderDetailVM } from "../Interfaces/IOrderDetailVM";
import { OrderDTO } from "../Interfaces/OrderDTO";

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

export const getOrderDetailById = async (req: Request, res: Response): Promise<OrderDetailVM> => {
    const { orderId } = req.query;
    try {
        if (!orderId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getOrderDetailByIdService(+orderId);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        const response = new OrderDetailVM();
        response.setError(error.message || Errors.OrderChangeStatus);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};


export const changeStatusOrder = async (req: Request, res: Response): Promise<ResponseMessages> => {
    const { orderStatusId, orderId } = req.query;
    try {
        if (!orderStatusId || !orderId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await changeStatusOrderService(+orderStatusId, +orderId);
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

export const getFilteringOptionsOrderList = async (req: Request, res: Response): Promise<FilteringOptionsOrderPagedListVM> => {
    const onlyOptions = convertedStringToBoolean(req.query.onlyOptions as string);
    const response = new FilteringOptionsOrderPagedListVM(onlyOptions);
    try {
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        response.setError(error.message || Errors.ProductVariants);
        res.status(500).send(response);
        return response;
    }
};

export const saveOrder = async (req: Request, res: Response): Promise<SaveOrderResponse> => {
    const newOrder: OrderDTO = req.body;
    let response = new SaveOrderResponse();
    try {
        response = await saveOrderService(newOrder);
        res.status(200).send(response);
        return response;
    } catch (error: any) {
        response.setError(error.message || Errors.SaveOrder);
        res.status(500).send(response);
        return response;
    }
};

