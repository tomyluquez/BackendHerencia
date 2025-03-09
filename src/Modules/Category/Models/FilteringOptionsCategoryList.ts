import { NameAndId } from "../../Other/Interfaces/Name-and-id.interface";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { StatusOptions } from "../../Other/Models/Status-options.model";

export class FilteringOptionsCategoryListVM extends ResponseMessages {
    Status: NameAndId[];

    constructor() {
        super();
        this.Status = new StatusOptions().items;
    }

}