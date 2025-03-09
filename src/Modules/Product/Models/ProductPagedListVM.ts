import { IProductPagedListVM } from "../Interfaces/IProductPagedList";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class ProductPagedListVM extends ResponseMessages {
    Items: IProductPagedListVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addProduct(product: IProductPagedListVM) {
        this.Items.push(product);
    }
}
