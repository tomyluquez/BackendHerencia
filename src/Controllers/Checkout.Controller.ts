import { Request, Response } from "express";
import { CheckoutInfoVM } from "../Models/Checkout/CheckoutVM";
import { Errors } from "../Text/Errors.Messages";
import { getCheckoutInfoService } from "../Services/Checkout.Service";

export const getCheckoutInfo = async (req: Request, res: Response): Promise<CheckoutInfoVM> => {
    const { cartId } = req.query;
    try {
        if (!cartId) {
            throw new Error(Errors.IdRequired);
        }
        const response = await getCheckoutInfoService(+cartId);
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new CheckoutInfoVM();
        response.setError(error.message || Errors.CheckoutInfo);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};
