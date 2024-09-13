import { IPriceListProducts } from "../../Interfaces/Products/IPriceListProductsVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class PriceListProductsVM extends ResponseMessages {
    Items: IPriceListProducts[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
