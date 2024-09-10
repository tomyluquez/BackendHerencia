import { ICartItemsVM } from "../../Interfaces/Cart/ICartItemsVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class UserCartItemsVM extends ResponseMessages {
    Items: ICartItemsVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addItems(items: ICartItemsVM[]) {
        this.Items = items;
        this.TotalItems = items.length;
    }
}
