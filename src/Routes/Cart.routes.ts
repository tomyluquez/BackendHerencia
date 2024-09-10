import { Router } from "express";
import { AddItemToCart, getCartItemsByUserId } from "../Controllers/CartController";

const router: Router = Router();

router.get("/cartItems", getCartItemsByUserId).post("/cartItem", AddItemToCart);

export { router as RouterCart };
