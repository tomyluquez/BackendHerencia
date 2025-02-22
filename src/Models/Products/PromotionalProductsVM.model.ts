import { IPromotionalProduct } from "../../Interfaces/Products/IPromotionalProducts";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class PromotionalProductsVM extends ResponseMessages {
  Items: IPromotionalProduct[];
  TotalItems: number;

  constructor() {
    super();
    this.Items = [];
    this.TotalItems = 0;
  }

  addProduct(product: IPromotionalProduct) {
    this.Items.push(product);
  }
}
