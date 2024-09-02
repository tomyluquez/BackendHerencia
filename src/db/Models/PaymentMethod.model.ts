import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/connectionDB.sequalize";

interface PaymentMethodAttributes {
  Id: number;
  Name: string;
  value: string;
}

interface PaymentMethodCreationAttributes
  extends Optional<PaymentMethodAttributes, "Id"> {}

class PaymentMethod
  extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>
  implements PaymentMethodAttributes
{
  public Id!: number;
  public Name!: string;
  public value!: string;
}

PaymentMethod.init(
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
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "PaymentMethods",
    modelName: "PaymentMethod",
    timestamps: false,
  }
);

export default PaymentMethod;
