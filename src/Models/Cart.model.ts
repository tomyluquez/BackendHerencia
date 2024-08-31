import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface CartAttributes {
  CartId: number;
  UserId: number;
  DateCreated: Date;
  DateUpdated: Date;
  IsFinish: boolean;
}

interface CartCreationAttributes extends Optional<CartAttributes, "CartId"> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public CartId!: number;
  public UserId!: number;
  public DateCreated!: Date;
  public DateUpdated!: Date;
  public IsFinish!: boolean;
}

Cart.init(
  {
    CartId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
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
    IsFinish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "Carts",
    modelName: "Cart",
  }
);

export default Cart;
