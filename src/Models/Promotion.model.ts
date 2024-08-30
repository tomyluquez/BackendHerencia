import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface PromotionAttributes {
  PromotionId: number;
  Code: string;
  IsActive: boolean;
  Discount: number;
}

interface PromotionCreationAttributes
  extends Optional<PromotionAttributes, "PromotionId"> {}

class Promotion
  extends Model<PromotionAttributes, PromotionCreationAttributes>
  implements PromotionAttributes
{
  public PromotionId!: number;
  public Code!: string;
  public IsActive!: boolean;
  public Discount!: number;
}

Promotion.init(
  {
    PromotionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Promotions",
  }
);

export default Promotion;
