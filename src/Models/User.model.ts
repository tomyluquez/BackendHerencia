import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

// Define los atributos del modelo
interface UserAttributes {
  UserId: number;
  Name: string;
  Email: string;
  Password: string;
  DateCreated: Date;
  Phone?: number;
  Addres?: string;
}

// Define atributos opcionales para la creación de nuevos usuarios
interface UserCreationAttributes
  extends Optional<UserAttributes, "UserId" | "Phone" | "Addres"> {}

// Crea la clase User que extiende de Model
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public UserId!: number;
  public Name!: string;
  public Email!: string;
  public Password!: string;
  public DateCreated!: Date;
  public Phone?: number;
  public Addres?: string;
}

// Inicializa el modelo
User.init(
  {
    UserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Addres: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Users",
    modelName: "User",
  }
);

export default User;
