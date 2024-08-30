import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface ProductAttributes {
  ProductId: number;
  Name: string;
  CategoryId: number;
  price: number;
  discount: number;
  UrlPhoto: string;
  isActive: boolean;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "ProductId" | "UrlPhoto"> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public ProductId!: number;
  public Name!: string;
  public CategoryId!: number;
  public price!: number;
  public discount!: number;
  public UrlPhoto!: string;
  public isActive!: boolean;
}

Product.init(
  {
    ProductId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    UrlPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
  }
);

export default Product;
