import { IProductVM } from "../../Interfaces/Products/IProductVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class ProductVM extends ResponseMessages {
    Items: IProductVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addProduct(product: IProductVM) {
        this.Items.push(product);
    }
}
