import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { IOrderDetailVM } from "../Interfaces/IOrderDetailVM";

export class SaveOrderResponse extends ResponseMessages {
    OrderNumber: number = 0;

    constructor() {
        super();
    }
}