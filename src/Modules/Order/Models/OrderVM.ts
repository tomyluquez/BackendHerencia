import { IOrderVM } from "../Interfaces/IOrderVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class OrderVM extends ResponseMessages {
    Items: IOrderVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
    setTotalItems(totalItems: number) {
        this.TotalItems = totalItems;
    }
}
