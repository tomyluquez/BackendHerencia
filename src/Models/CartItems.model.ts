import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface CartItemsAttributes {
  CartItemsId: number;
  CartId: number;
  VariantId: number;
  Quantity: number;
  UnitPrice: number;
  TotalPrice: number;
  DateCreated: Date;
  DateUpdated: Date;
}

interface CartItemsCreationAttributes
  extends Optional<CartItemsAttributes, "CartItemsId"> {}

class CartItems
  extends Model<CartItemsAttributes, CartItemsCreationAttributes>
  implements CartItemsAttributes
{
  public CartItemsId!: number;
  public CartId!: number;
  public VariantId!: number;
  public Quantity!: number;
  public UnitPrice!: number;
  public TotalPrice!: number;
  public DateCreated!: Date;
  public DateUpdated!: Date;
}

CartItems.init(
  {
    CartItemsId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CartId: {
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
    tableName: "CartItems",
    modelName: "CartItems",
  }
);

export default CartItems;
