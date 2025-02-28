import { Router } from "express";
import { findDiscountCoupon, getCheckoutInfo } from "../Controllers/Checkout.Controller";
import DiscountCoupon from './../db/Models/DiscountCoupon.model';

const router: Router = Router();

router.get("/", getCheckoutInfo).get("/DiscountCoupon", findDiscountCoupon);

export { router as RouterCheckout };
