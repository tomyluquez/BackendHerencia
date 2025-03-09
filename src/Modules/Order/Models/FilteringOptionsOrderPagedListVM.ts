import { NameAndId } from "../../Other/Interfaces/Name-and-id.interface";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { OrderStatusEnum } from "../Enums/Order-status-enum";
import { OrderStatusOptions } from "./OrderStatus.model";

export class FilteringOptionsOrderPagedListVM extends ResponseMessages {
    Status: NameAndId[];
    OnlyOptions: boolean;

    constructor(onlyOptions: boolean) {
        super();
        this.Status = new OrderStatusOptions().items;
        this.OnlyOptions = onlyOptions;

        if (this.OnlyOptions) {
            this.Status = this.Status.filter(x => x.Id !== OrderStatusEnum.All);
        }
    }
}