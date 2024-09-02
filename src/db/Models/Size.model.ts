import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/connectionDB.sequalize";

interface SizeAttributes {
  Id: number;
  Name: string;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, "Id"> {}

class Size
  extends Model<SizeAttributes, SizeCreationAttributes>
  implements SizeAttributes
{
  public Id!: number;
  public Name!: string;
}

Size.init(
  {
    Id: {
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
    timestamps: false,
  }
);

export default Size;
