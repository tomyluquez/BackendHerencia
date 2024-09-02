import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connectionDB.sequalize";
import Product from "./Product.model";

interface CategoryAttributes {
  Id: number;
  Name: string;
  UrlPhoto: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "Id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public Id!: number;
  public Name!: string;
  public UrlPhoto!: string;
  public Products?: Product[];
}

Category.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UrlPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "Categories",
    modelName: "Category",
    timestamps: false,
  }
);

export default Category;
