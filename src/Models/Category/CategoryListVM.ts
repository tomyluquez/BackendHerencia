import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class CategoryListVM extends ResponseMessages {
    Items: ICategoryVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }

    AddCategory(category: ICategoryVM) {
        this.Items.push(category);
    }
}
