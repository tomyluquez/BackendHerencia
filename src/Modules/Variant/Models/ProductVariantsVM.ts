import { IProductVariants } from "../../Product/Interfaces/IProductsVariants";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class ProductVarinantsVM extends ResponseMessages {
    Items: IProductVariants[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    addItems(items: IProductVariants[]) {
        this.Items = items;
        this.TotalItems = items.length;
    }

    setTotalItems(totalItems: number) {
        this.TotalItems = totalItems;
    }

    getTotalItems() {
        return this.TotalItems;
    }
}
