import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface CategoryAttributes {
  CategoryId: number;
  Name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "CategoryId"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public CategoryId!: number;
  public Name!: string;
}

Category.init(
  {
    CategoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Categories",
    modelName: "Category",
  }
);

export default Category;
