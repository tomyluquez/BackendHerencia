import { IOrderStatusVM } from "../../Interfaces/Orders/IOrderStatusVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class OrderStatusVM extends ResponseMessages {
    Items: IOrderStatusVM[];

    constructor() {
        super();
        this.Items = [];
    }
}
