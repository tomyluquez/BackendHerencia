import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface OrderStatusAttributes {
  OrderStatusId: number;
  Name: string;
}

interface OrderStatusCreationAttributes
  extends Optional<OrderStatusAttributes, "OrderStatusId"> {}

class OrderStatus
  extends Model<OrderStatusAttributes, OrderStatusCreationAttributes>
  implements OrderStatusAttributes
{
  public OrderStatusId!: number;
  public Name!: string;
}

OrderStatus.init(
  {
    OrderStatusId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "OrderStatus",
    modelName: "OrderStatus",
  }
);

export default OrderStatus;
