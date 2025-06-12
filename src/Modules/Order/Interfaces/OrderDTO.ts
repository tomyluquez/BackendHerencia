export interface OrderDTO {
    Id: number;
    OrderNumber: number;
    Total: number;
    Subtotal: number;
    DiscountCoupon: number;
    DiscountCouponPercentage: number,
    DiscountCouponId: number,
    DiscountPayment: number;
    DiscountPaymentPercentage: number,
    DateCreated: Date;
    OrderStatusId: number;
    PaymentMethodId: number;
    ShippingMethodId: number;
    CustomerName: string;
    ShippingCost: number;
    UserId: number;
    Details?: OrderItemDTO[];
    CartId: number;
}

interface OrderItemDTO {
    Id: number;
    Name: string;
    SizeName: string;
    SizeId: number;
    UnitPrice: number;
    TotalPrice: number;
    Quantity: number;
    VariantId: number;
}
