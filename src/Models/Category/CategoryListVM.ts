import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class CategoryListVM extends ResponseMessages {
  Items: ICategoryVM[];

  constructor() {
    super();
    this.Items = [];
  }

  AddCategory(category: ICategoryVM) {
    this.Items.push(category);
  }
}
