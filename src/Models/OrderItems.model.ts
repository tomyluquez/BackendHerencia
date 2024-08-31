import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface OrderItemsAttributes {
  OrderItemsId: number;
  VariantId: number;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
  DateCreated: Date;
  DateUpdated: Date;
  OrderId: number;
}

interface OrderItemsCreationAttributes
  extends Optional<OrderItemsAttributes, "OrderItemsId"> {}

class OrderItems
  extends Model<OrderItemsAttributes, OrderItemsCreationAttributes>
  implements OrderItemsAttributes
{
  public OrderItemsId!: number;
  public OrderId!: number;
  public VariantId!: number;
  public Quantity!: number;
  public UnitPrice!: number;
  public TotalPrice!: number;
  public DateCreated!: Date;
  public DateUpdated!: Date;
}

OrderItems.init(
  {
    OrderItemsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    VariantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UnitPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TotalPrice: {
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
    tableName: "OrderItems",
    modelName: "OrderItems",
  }
);

export default OrderItems;
