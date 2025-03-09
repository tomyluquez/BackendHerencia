import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

export class DiscountCouponVM extends ResponseMessages {
    Discount?: number;

    constructor() {
        super();
        this.Discount = 0;
    }
}
