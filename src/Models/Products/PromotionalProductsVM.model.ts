import { IPromotionalProduct } from "../../Interfaces/Products/IPromotionalProducts";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class PromotionalProductsVM extends ResponseMessages {
  Items: IPromotionalProduct[];

  constructor() {
    super();
    this.Items = [];
  }

  addProduct(product: IPromotionalProduct) {
    this.Items.push(product);
  }
}
