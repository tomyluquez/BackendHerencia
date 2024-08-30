import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface VariantAttributes {
  VariantId: number;
  ProductId: number;
  SizeId: number;
  Stock: number;
}

interface VariantCreationAttributes
  extends Optional<VariantAttributes, "VariantId"> {}

class Variant
  extends Model<VariantAttributes, VariantCreationAttributes>
  implements VariantAttributes
{
  public VariantId!: number;
  public ProductId!: number;
  public SizeId!: number;
  public Stock!: number;
}

Variant.init(
  {
    VariantId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "Variants",
  }
);

export default Variant;
