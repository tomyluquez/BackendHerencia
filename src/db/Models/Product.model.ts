import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connectionDB.sequalize";
import Category from "./Category.model";

interface ProductAttributes {
  Id: number;
  Name: string;
  Price: number;
  Discount: number;
  UrlPhoto: string;
  IsActive: boolean;
  IsPromocional: boolean;
  DateCreated: Date;
  DateUpdated: Date;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "Id" | "UrlPhoto"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public Id!: number;
  public Name!: string;
  public Price!: number;
  public Discount!: number;
  public UrlPhoto!: string;
  public IsActive!: boolean;
  public IsPromocional!: boolean;
  public CategoryId!: number;
  public Category?: Category;
  public DateCreated!: Date;
  public DateUpdated!: Date;
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
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    UrlPhoto: {
      type: DataTypes.STRING,
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
