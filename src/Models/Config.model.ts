import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

interface ConfigAttributes {
  ConfigId: number;
  Name: string;
  value: string;
}

interface ConfigCreationAttributes
  extends Optional<ConfigAttributes, "ConfigId"> {}

class Config
  extends Model<ConfigAttributes, ConfigCreationAttributes>
  implements ConfigAttributes
{
  public ConfigId!: number;
  public Name!: string;
  public value!: string;
}

Config.init(
  {
    ConfigId: {
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
  }
);

export default Config;
