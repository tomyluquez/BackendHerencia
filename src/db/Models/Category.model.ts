import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connectionDB.sequalize";
import Product from "./Products/Product.model";

interface CategoryAttributes {
    Id?: number;
    Name: string;
    Image: string;
    IsActive: boolean;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "Id" | "Image" | "IsActive"> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public Id?: number;
    public Name!: string;
    public Image!: string;
    public Products?: Product[];
    public IsActive!: boolean;
}

Category.init(
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
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        tableName: "Categories",
        modelName: "Category",
        timestamps: false
    }
);

export default Category;
