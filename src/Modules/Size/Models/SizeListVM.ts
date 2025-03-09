import { ISizeListVM } from "../Interfaces/ISizeListVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class SizeLlistVM extends ResponseMessages {
    Items: ISizeListVM[];
    TotalItems: number;

    constructor() {
        super();
        this.Items = [];
        this.TotalItems = 0;
    }
}
