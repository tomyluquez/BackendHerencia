import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connectionDB.sequalize";

// Define los atributos del modelo
interface UserAttributes {
  UserId: number;
  Name: string;
  Email: string;
  Password: string;
  DateCreated: Date;
  Phone: number;
  Adress: string;
}

// Define atributos opcionales para la creación de nuevos usuarios
interface UserCreationAttributes
  extends Optional<UserAttributes, "UserId" | "Phone" | "Adress"> {}

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
  public Phone!: number;
  public Adress!: string;
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
      allowNull: false,
      defaultValue: null,
    },
    Adress: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
