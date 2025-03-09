import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../connectionDB.sequalize";
import Promotion from "../Promotion.model";
import PaymentMethod from "../PaymentMethod.model";
import OrderStatus from "./OrderStatus.model";
import User from "../User.model";
import ShippingMethod from "../Shipping/ShippingMethod.model";
import OrderItems from "./OrderItems.model";
import DiscountCoupon from './../DiscountCoupon.model';

interface OrderAttributes {
    Id: number;
    OrderNumber: number;
    DateCreated: Date;
    DateUpdated: Date;
    IsActive: boolean;
    Total: number;
    Subtotal: number;
    Discount: number;
    DiscountCouponId?: number;
    DiscountCoupon?: DiscountCoupon;
    UserId?: number;
    User?: User;
    OrderStatusId?: number;
    OrderStatus?: OrderStatus;
    PromotionId?: number;
    Promotion?: Promotion;
    PaymentMethodId?: number;
    PaymentMethod?: PaymentMethod;
    ShippingMethodId?: number;
    ShippingMethod?: ShippingMethod;
    OrderItems?: OrderItems[];
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "Id"> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public Id!: number;
    public OrderNumber!: number;
    public DateCreated!: Date;
    public DateUpdated!: Date;
    public IsActive!: boolean;
    public Total!: number;
    public Subtotal!: number;
    public Discount!: number;
    public DiscountCouponId!: number;
    public DiscountCoupon!: DiscountCoupon;
    public UserId!: number;
    public User!: User;
    public OrderStatusId!: number;
    public OrderStatus!: OrderStatus;
    public PromotionId!: number;
    public Promotion?: Promotion;
    public PaymentMethodId!: number;
    public PaymentMethod?: PaymentMethod;
    public ShippingMethodId!: number;
    public ShippingMethod?: ShippingMethod;
    public OrderItems?: OrderItems[];
}

Order.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OrderNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        Total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DiscountCouponId: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        DateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        DateUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: "Orders",
        modelName: "Order",
        timestamps: false
    }
);

export default Order;
