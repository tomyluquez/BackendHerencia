import { ISizeListVM } from "../../Interfaces/Sizes/ISizeListVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class SizeVM extends ResponseMessages {
    Item: ISizeListVM;

    constructor() {
        super();
        this.Item = {} as ISizeListVM;
    }
}
