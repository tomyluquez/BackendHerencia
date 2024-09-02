import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/connectionDB.sequalize";

interface ConfigAttributes {
  Id: number;
  Name: string;
  value: string;
}

interface ConfigCreationAttributes extends Optional<ConfigAttributes, "Id"> {}

class Config
  extends Model<ConfigAttributes, ConfigCreationAttributes>
  implements ConfigAttributes
{
  public Id!: number;
  public Name!: string;
  public value!: string;
}

Config.init(
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
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Config",
    modelName: "Config",
    timestamps: false,
  }
);

export default Config;
