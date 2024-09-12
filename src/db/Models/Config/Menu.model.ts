import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../connectionDB.sequalize";

interface MenuAttributes {
    Id: number;
    Name: string;
    Href: string;
    Icon: string;
}

interface MenuCreationAttributes extends Optional<MenuAttributes, "Id"> {}

class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
    public Id!: number;
    public Name!: string;
    public Href!: string;
    public Icon!: string;
}

Menu.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Href: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Icon: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "Menu",
        modelName: "Menu",
        timestamps: false
    }
);

export default Menu;
