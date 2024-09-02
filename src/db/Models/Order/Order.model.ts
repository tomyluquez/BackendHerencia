import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../connectionDB.sequalize";
import Promotion from "../Promotion.model";
import PaymentMethod from "../PaymentMethod.model";
import ShippingMethod from "../ShippingMethod.model";
import OrderStatus from "./OrderStatus.model";
import User from "../User.model";

interface OrderAttributes {
  Id: number;
  OrderNumber: number;
  DateCreated: Date;
  DateUpdated: Date;
  IsActive: boolean;
  Total: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "Id"> {}

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public Id!: number;
  public OrderNumber!: number;
  public DateCreated!: Date;
  public DateUpdated!: Date;
  public IsActive!: boolean;
  public Total!: number;
  public UserId!: number;
  public User!: User;
  public OrderStatusId!: string;
  public OrderStatus!: OrderStatus;
  public PromotionId!: number;
  public Promotion?: Promotion;
  public PaymentMethodId!: number;
  public PaymentMethod?: PaymentMethod;
  public ShippingMethodId!: number;
  public ShippingMethod?: ShippingMethod;
}

Order.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    Total: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    tableName: "Orders",
    modelName: "Order",
    timestamps: false,
  }
);

export default Order;
