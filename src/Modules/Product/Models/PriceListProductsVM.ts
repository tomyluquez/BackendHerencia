import { IPriceListProducts } from "../Interfaces/IPriceListProductsVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class PriceListProductsVM extends ResponseMessages {
    Items: IPriceListProducts[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
