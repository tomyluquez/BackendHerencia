import { OrderStatusVM } from "../Models/OrderStatusVM";
import { OrderVM } from "../Models/OrderVM";
import { changeStatusOrderRepository, getOrderDetailByIdRepository, getOrdersRepository, getOrderStatusRepository } from "../Repositories/Order.Repository";
import { Errors } from "../../Text/Errors.Messages";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { OrderSearchDTO } from "../Dtos/OrderSearchDTO";
import { isValidSatusOrder } from "../Helpers/Validators/OrderValidator";
import { OrderDetailVM } from "../Models/OrderDetailVM";

export const getOrdersService = async (search: OrderSearchDTO): Promise<OrderVM> => {
    return await getOrdersRepository(search);
};

export const getOrderDetailByIdService = async (orderId: number): Promise<OrderDetailVM> => {
    return await getOrderDetailByIdRepository(orderId);
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
