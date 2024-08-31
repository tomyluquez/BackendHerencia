import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface SizeAttributes {
  SizeId: number;
  Name: string;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, "SizeId"> {}

class Size
  extends Model<SizeAttributes, SizeCreationAttributes>
  implements SizeAttributes
{
  public SizeId!: number;
  public Name!: string;
}

Size.init(
  {
    SizeId: {
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
    tableName: "Sizes",
    modelName: "Size",
  }
);

export default Size;
