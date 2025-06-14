import { OrderStatusVM } from "../Models/OrderStatusVM";
import { OrderVM } from "../Models/OrderVM";
import { changeStatusOrderRepository, getOrderDetailByIdRepository, getOrderDetailByOrderNumberRepository, getOrdersRepository, getOrderStatusRepository, saveOrderRepository } from "../Repositories/Order.Repository";
import { Errors } from "../../Text/Errors.Messages";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { OrderSearchDTO } from "../Dtos/OrderSearchDTO";
import { isValidSatusOrder } from "../Helpers/Validators/OrderValidator";
import { OrderDetailVM } from "../Models/OrderDetailVM";
import { OrderDTO } from "../Interfaces/OrderDTO";
import { SaveOrderResponse } from "../Models/SaveOrderResponse.model";
import { mapOrderDTOToDB } from "../Helpers/Maps/MapOrders";
import { getUserIdByNameRepository } from "../../User/Repositories/User.Repository";

export const getOrdersService = async (search: OrderSearchDTO): Promise<OrderVM> => {
    return await getOrdersRepository(search);
};

export const getOrderDetailByIdService = async (orderId: number): Promise<OrderDetailVM> => {
    return await getOrderDetailByIdRepository(orderId);
}

export const getOrderDetailByOrderNumberService = async (orderNumber: number): Promise<OrderDetailVM> => {
    return await getOrderDetailByOrderNumberRepository(orderNumber);
}

export const changeStatusOrderService = async (orderStatusId: number, orderId: number): Promise<ResponseMessages> => {
    const isValidStatusId = isValidSatusOrder(orderStatusId);
    if (!isValidStatusId) {
        const response = new ResponseMessages();
        response.setError(Errors.StatusNotFound);
        return response;
    }
    return await changeStatusOrderRepository(orderStatusId, orderId);
};

export const getOrderStatusService = async (): Promise<OrderStatusVM> => {
    return await getOrderStatusRepository();
};

export const saveOrderService = async (order: OrderDTO): Promise<SaveOrderResponse> => {
    const userId = await getUserIdByNameRepository(order.CustomerName)
    const newOrder = mapOrderDTOToDB(order, userId);
    console.log(newOrder)
    return await saveOrderRepository(newOrder, order.CartId)
}
