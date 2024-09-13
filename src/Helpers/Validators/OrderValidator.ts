import { getOrderStatusByIdRepository } from "../../Repositories/Order.Repository";

export const isValidSatusOrder = async (statusId: number): Promise<boolean> => {
    const orderStatus = await getOrderStatusByIdRepository(statusId);

    return !!orderStatus;
};
