import { IPromotionalProduct } from "../Interfaces/IPromotionalProducts";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";

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
