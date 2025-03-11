import { NameAndId } from "../../Other/Interfaces/Name-and-id.interface";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { StatusOptions } from "../../Other/Models/Status-options.model";

export class FilteringOptionsPriceListVM extends ResponseMessages {
    Categories: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
    }

    addCategories(categories: NameAndId[]) {
        this.Categories = categories;
    }

}