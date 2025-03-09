import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { IOrderDetailVM } from "../Interfaces/IOrderDetailVM";

export class OrderDetailVM extends ResponseMessages {
    Items: IOrderDetailVM;

    constructor() {
        super();
        this.Items = {} as IOrderDetailVM;
    }

}