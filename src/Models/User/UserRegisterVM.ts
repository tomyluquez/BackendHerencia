import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class UserTokenVM extends ResponseMessages {
    Token: string;
    Role: number;

    constructor() {
        super();
        this.Token = "";
        this.Role = 0;
    }
}
