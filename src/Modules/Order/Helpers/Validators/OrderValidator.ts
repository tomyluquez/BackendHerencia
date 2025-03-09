import { getOrderStatusByIdRepository } from "../../Repositories/Order.Repository";

export const isValidSatusOrder = async (orderStatusId: number): Promise<boolean> => {
    const orderStatus = await getOrderStatusByIdRepository(orderStatusId);

    return !!orderStatus;
};
