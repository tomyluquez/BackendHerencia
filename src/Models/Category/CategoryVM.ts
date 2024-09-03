import { ICategoryVM } from "../../Interfaces/Category/ICategoryVM";
import { ResponseMessages } from "../Errors/ResponseMessages.model";

export class CategoryVM extends ResponseMessages {
  Item: ICategoryVM | null;

  constructor() {
    super();
    this.Item = null;
  }

  AddCategory(category: ICategoryVM) {
    this.Item = category;
  }
}
