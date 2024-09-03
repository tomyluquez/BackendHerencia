import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../connectionDB.sequalize";
import Category from "../Category.model";
import Size from "../Size.model";
import ProductImages from "./ProductsImages.model";
import Variant from "../Variant.model";

interface ProductAttributes {
  Id: number;
  Name: string;
  Price: number;
  Cost: number;
  Discount: number;
  Description: string;
  IsActive: boolean;
  IsPromocional: boolean;
  DateCreated: Date;
  DateUpdated: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "Id"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public Id!: number;
  public Name!: string;
  public Price!: number;
  public Cost!: number;
  public Discount!: number;
  public Description!: string;
  public IsActive!: boolean;
  public IsPromocional!: boolean;
  public CategoryId!: number;
  public Category?: Category;
  public DateCreated!: Date;
  public DateUpdated!: Date;
  public Variants?: Variant[];
  public Images?: string[];
}

Product.init(
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
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    IsPromocional: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    DateUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Products",
    modelName: "Product",
    timestamps: false,
  }
);

export default Product;
