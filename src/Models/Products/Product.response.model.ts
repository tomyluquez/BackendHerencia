import { ErrorsResponse } from "../Errors.response.model";

export class ProductResponse extends ErrorsResponse {
  Items: ProductVM[];

  constructor() {
    super();
    this.Items = [];
  }

  addProduct(product: ProductVM) {
    this.Items.push(product);
  }
}

export interface ProductVM {
  Name: string;
  Category: string;
  Price: number;
  UrlPhoto?: string;
}
