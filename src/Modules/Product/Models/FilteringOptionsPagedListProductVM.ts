import { NameAndId } from "../../Other/Interfaces/Name-and-id.interface";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { StatusOptions } from "../../Other/Models/Status-options.model";

export class FilteringOptionsPagedListProductVM extends ResponseMessages {
    Categories: NameAndId[];
    Status: NameAndId[];

    constructor() {
        super();
        this.Categories = [];
        this.Status = new StatusOptions().items;
    }

    addCategories(categories: NameAndId[]) {
        this.Categories = categories;
    }

}