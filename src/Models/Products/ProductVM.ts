import { IProductVM } from "../../Interfaces/Products/IProductVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class ProductVM extends ResponseMessages {
  Items: IProductVM[];

  constructor() {
    super();
    this.Items = [];
  }

  addProduct(product: IProductVM) {
    this.Items.push(product);
  }
}
