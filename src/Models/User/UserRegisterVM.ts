import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class UserTokenVM extends ResponseMessages {
    Token: string;
    Role: string;

    constructor() {
        super();
        this.Token = "";
        this.Role = "";
    }
}
