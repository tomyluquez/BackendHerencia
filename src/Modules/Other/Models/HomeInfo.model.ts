import { CategoryListVM } from "../../Category/Models/CategoryListVM";
import { PromotionalProductsVM } from "../../Product/Models/PromotionalProductsVM.model";
import { ResponseMessages } from "./ResponseMessages.model";

export class HomeInfoResponse extends ResponseMessages {
    Categories!: CategoryListVM
    PromotionalProducts!: PromotionalProductsVM

    constructor() {
        super();
    }

}