import { ISizeListVM } from "../Interfaces/ISizeListVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class SizeVM extends ResponseMessages {
    Item: ISizeListVM;

    constructor() {
        super();
        this.Item = {} as ISizeListVM;
    }
}
