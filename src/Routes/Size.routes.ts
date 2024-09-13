import { Router } from "express";
import { changeStatus, getSizeById, getSizesList, saveSize } from "../Controllers/Size.Controller";

const router = Router();

router.get("/sizeList", getSizesList).put("/sizeStatus", changeStatus).post("/", saveSize).get("/size", getSizeById);

export { router as RouterSizes };
