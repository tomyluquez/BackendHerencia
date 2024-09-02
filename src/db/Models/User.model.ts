import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../db/connectionDB.sequalize";

// Define los atributos del modelo
interface UserAttributes {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
  Phone?: number;
  Addres?: string;
  DateCreated: Date;
  DateUpdated: Date;
}

// Define atributos opcionales para la creación de nuevos usuarios
interface UserCreationAttributes
  extends Optional<UserAttributes, "Id" | "Phone" | "Addres"> {}

// Crea la clase User que extiende de Model
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public Id!: number;
  public Name!: string;
  public Email!: string;
  public Password!: string;
  public Phone?: number;
  public Addres?: string;
  public DateCreated!: Date;
  public DateUpdated!: Date;
}

// Inicializa el modelo
User.init(
  {
    Id: {
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
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    Addres: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
    tableName: "Users",
    modelName: "User",
    timestamps: false,
  }
);

export default User;
