import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface OrderAttributes {
  OrderId: number;
  OrderNumber: number;
  DateCreated: Date;
  Status: string;
  IsActive: boolean;
  UserId: number;
  Total: number;
  PromotionId: number;
  PaymentMethodId: number;
  ShippingMethodId: number;
}

interface OrderCreationAttributes
  extends Optional<OrderAttributes, "OrderId"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public OrderId!: number;
  public OrderNumber!: number;
  public DateCreated!: Date;
  public Status!: string;
  public IsActive!: boolean;
  public UserId!: number;
  public Total!: number;
  public PromotionId!: number;
  public PaymentMethodId!: number;
  public ShippingMethodId!: number;
}

Order.init(
  {
    OrderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PromotionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PaymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ShippingMethodId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Orders",
  }
);

export default Order;
