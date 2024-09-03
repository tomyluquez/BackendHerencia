import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./../../connectionDB.sequalize";
import Product from "./Product.model";

interface ProductImagesAttributes {
  Id: number;
  Url: string;
}

interface ProductImagesCreationAttributes
  extends Optional<ProductImagesAttributes, "Id"> {}

class ProductImages
  extends Model<ProductImagesAttributes, ProductImagesCreationAttributes>
  implements ProductImagesAttributes
{
  public Id!: number;
  public Url!: string;
  public ProductId!: number;
  public Product!: Product;
}

ProductImages.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ProductImages",
    modelName: "ProductImages",
    timestamps: false,
  }
);

export default ProductImages;
