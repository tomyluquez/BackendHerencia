import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "./../connectionDB.sequalize";

interface DiscountCouponOrderAttributes {
    Id: number;
    DiscountCouponId: number;
    OrderId: number;
    DateCreated: Date;
}

interface DiscountCouponOrderCreationAttributes extends Optional<DiscountCouponOrderAttributes, "Id" | "DateCreated"> { }

class DiscountCouponOrder extends Model<DiscountCouponOrderAttributes, DiscountCouponOrderCreationAttributes> implements DiscountCouponOrderAttributes {
    public Id!: number;
    public DiscountCouponId!: number;
    public OrderId!: number;
    public DateCreated!: Date;
}

DiscountCouponOrder.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DiscountCouponId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

    },
    {
        sequelize,
        tableName: "DiscountCouponOrders",
        modelName: "DiscountCouponOrder",
        timestamps: false
    }
);

export default DiscountCouponOrder;
