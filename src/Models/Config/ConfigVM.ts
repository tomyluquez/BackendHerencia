import { IConfigVM } from "../../Interfaces/Config/IConfigVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class ConfigVM extends ResponseMessages {
    Items: IConfigVM[];
    constructor() {
        super();
        this.Items = [];
    }
}
