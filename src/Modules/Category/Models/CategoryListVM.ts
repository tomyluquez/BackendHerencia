import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { ICategoryVM } from "../Interfaces/ICategoryVM";

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
