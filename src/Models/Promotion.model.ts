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
      unique: true,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
  },
  {
    sequelize,
    tableName: "Promotions",
    modelName: "Promotion",
  }
);

export default Promotion;
