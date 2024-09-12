import { Router } from "express";
import { getCheckoutInfo } from "../Controllers/Checkout.Controller";

const router: Router = Router();

router.get("/", getCheckoutInfo);

export { router as RouterCheckout };
