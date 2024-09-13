import { OrderSearchDTO } from "../DTO/Orders/OrderSearchDTO";
import { isValidSatusOrder } from "../Helpers/Validators/OrderValidator";
import { OrderStatusVM } from "../Models/Orders/OrderStatusVM";
import { OrderVM } from "../Models/Orders/OrderVM";
import { changeStatusOrderRepository, getOrdersRepository, getOrderStatusRepository } from "../Repositories/Order.Repository";
import { Errors } from "../Text/Errors.Messages";
import { ResponseMessages } from "./../Models/Errors/ResponseMessages.model";

export const getOrdersService = async (search: OrderSearchDTO): Promise<OrderVM> => {
    return await getOrdersRepository(search);
};

export const changeStatusOrderService = async (statusId: number, orderId: number): Promise<ResponseMessages> => {
    const isValidStatusId = isValidSatusOrder(statusId);
    if (!isValidStatusId) {
        const response = new ResponseMessages();
        response.setError(Errors.StatusNotFound);
        return response;
    }
    return await changeStatusOrderRepository(statusId, orderId);
};

export const getOrderStatusService = async (): Promise<OrderStatusVM> => {
    return await getOrderStatusRepository();
};
