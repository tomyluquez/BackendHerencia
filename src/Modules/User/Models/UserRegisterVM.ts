import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class UserTokenVM extends ResponseMessages {
    Token: string;
    Role: number;

    constructor() {
        super();
        this.Token = "";
        this.Role = 0;
    }
}
