import { IProductPagedListVM } from "../../Interfaces/Products/IProductPagedList";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class ProductPagedListVM extends ResponseMessages {
    Items: IProductPagedListVM[];

    constructor() {
        super();
        this.Items = [];
    }

    addProduct(product: IProductPagedListVM) {
        this.Items.push(product);
    }
}
