import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/connectionDB.sequalize";

interface ProductAttributes {
  ProductId: number;
  Name: string;
  CategoryId: number;
  Price: number;
  Discount: number;
  UrlPhoto: string;
  IsActive: boolean;
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
  public Price!: number;
  public Discount!: number;
  public UrlPhoto!: string;
  public IsActive!: boolean;
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
    },
  },
  {
    sequelize,
    tableName: "Products",
    modelName: "Product",
  }
);

export default Product;
