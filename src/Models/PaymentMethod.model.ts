import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface PaymentMethodAttributes {
  PaymentMethodId: number;
  Name: string;
  value: string;
}

interface PaymentMethodCreationAttributes
  extends Optional<PaymentMethodAttributes, "PaymentMethodId"> {}

class PaymentMethod
  extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes>
  implements PaymentMethodAttributes
{
  public PaymentMethodId!: number;
  public Name!: string;
  public value!: string;
}

PaymentMethod.init(
  {
    PaymentMethodId: {
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
  }
);

export default PaymentMethod;
