import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/connectionDB.sequalize";
import Size from "./Size.model";
import Product from "./Product.model";

interface VariantAttributes {
  Id: number;
  Stock: number;
  DateCreated: Date;
  DateUpdated: Date;
}

interface VariantCreationAttributes extends Optional<VariantAttributes, "Id"> {}

class Variant
  extends Model<VariantAttributes, VariantCreationAttributes>
  implements VariantAttributes
{
  public Id!: number;
  public Stock!: number;
  public DateCreated!: Date;
  public DateUpdated!: Date;
  public ProductId!: number;
  public Product!: Product;
  public SizeId!: number;
  public Size?: Size;
}

Variant.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "Variants",
    modelName: "Variant",
    timestamps: false,
  }
);

export default Variant;
