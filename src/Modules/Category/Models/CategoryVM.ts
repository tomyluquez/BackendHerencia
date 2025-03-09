import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { ICategoryVM } from "../Interfaces/ICategoryVM";

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
