export interface IOrderDetailVM {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    DiscountCouponTotal: number;
    DiscountCoupon?: string,
    DiscountPaymentTotal: number;
    DateCreated: Date;
    OrderStatus: string;
    OrderStatusId: number;
    PaymentMethod?: string;
    ShippingMethod?: string;
    CustomerName: string;
    Details?: OrderItem[];
}

interface OrderItem {
    Id: number;
    Name: string;
    SizeName: string;
    SizeId: number;
    UnitPrice: number;
    TotalPrice: number;
    Quantity: number;
    VariantId: number;
}

export interface IOrderUser {
    Id: number;
    OrderNumber: number;
    DateCreated: Date;
    OrderStatusId: number;
    QuantityItems: number;
    Total: number;
}
