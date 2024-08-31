import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface ShippingMethodAttributes {
  ShippingMethodId: number;
  Name: string;
  value: string;
}

interface ShippingMethodCreationAttributes
  extends Optional<ShippingMethodAttributes, "ShippingMethodId"> {}

class ShippingMethod
  extends Model<ShippingMethodAttributes, ShippingMethodCreationAttributes>
  implements ShippingMethodAttributes
{
  public ShippingMethodId!: number;
  public Name!: string;
  public value!: string;
}

ShippingMethod.init(
  {
    ShippingMethodId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ShippingMethods",
    modelName: "ShippingMethod",
  }
);

export default ShippingMethod;
