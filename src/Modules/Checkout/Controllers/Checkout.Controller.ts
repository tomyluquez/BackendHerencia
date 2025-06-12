import { Request, Response } from "express";
import { CheckoutInfoVM } from "../Models/CheckoutVM";
import { Errors } from "../../Text/Errors.Messages";
import { findDiscountCouponService, getCheckoutInfoService } from "../Services/Checkout.Service";
import { DiscountCouponVM } from "../Models/DiscountCouponVM";

export const getCheckoutInfo = async (req: Request, res: Response): Promise<CheckoutInfoVM> => {
    try {

        const response = await getCheckoutInfoService();
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new CheckoutInfoVM();
        response.setError(error.message || Errors.CheckoutInfo);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }
};

export const findDiscountCoupon = async (req: Request, res: Response): Promise<DiscountCouponVM> => {
    const { couponName } = req.query;
    try {
        if (!couponName) {
            throw new Error(Errors.NameRequired);
        }
        const response = await findDiscountCouponService(String(couponName));
        res.status(200).json(response);
        return response;
    } catch (error: any) {
        const response = new DiscountCouponVM();
        response.setError(error.message || Errors.CheckoutInfo);
        res.status(error.message ? 400 : 500).send(response);
        return response;
    }

}
