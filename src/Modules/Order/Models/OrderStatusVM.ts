import { IOrderStatusVM } from "../Interfaces/IOrderStatusVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class OrderStatusVM extends ResponseMessages {
    Items: IOrderStatusVM[];

    constructor() {
        super();
        this.Items = [];
    }
}
