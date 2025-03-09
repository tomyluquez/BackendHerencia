import { IProductVM } from "../Interfaces/IProductVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

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
