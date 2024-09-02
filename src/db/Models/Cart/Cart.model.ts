import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../connectionDB.sequalize";
import User from "./../User.model";

interface CartAttributes {
  Id: number;
  IsFinish: boolean;
  DateCreated: Date;
  DateUpdated: Date;
}

interface CartCreationAttributes extends Optional<CartAttributes, "Id"> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public Id!: number;
  public IsFinish!: boolean;
  public DateCreated!: Date;
  public DateUpdated!: Date;
  public UserId!: number;
  public User?: User;
}

Cart.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    IsFinish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "Carts",
    modelName: "Cart",
    timestamps: false,
  }
);

export default Cart;
