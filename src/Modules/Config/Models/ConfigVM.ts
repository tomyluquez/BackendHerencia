import { IConfigVM } from "../Interfaces/IConfigVM";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class ConfigVM extends ResponseMessages {
    Items: IConfigVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
