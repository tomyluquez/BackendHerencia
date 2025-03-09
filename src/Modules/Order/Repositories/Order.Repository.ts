import { Op } from "sequelize";
import Order from "../../../db/Models/Order/Order.model";
import User from "../../../db/Models/User.model";
import { OrderVM } from "../Models/OrderVM";
import OrderStatus from "../../../db/Models/Order/OrderStatus.model";
import { Errors } from "../../Text/Errors.Messages";
import { mapOrderDetailDBToVm, mapOrdersDBToVM, mapOrderStatusDBToVM } from "../Helpers/Maps/MapOrders";
import { ResponseMessages } from "../../Other/Models/ResponseMessages.model";
import { Success } from "../../Text/Succes.Messages";
import { OrderStatusVM } from "../Models/OrderStatusVM";
import { OrderSearchDTO } from "../Dtos/OrderSearchDTO";
import { OrderStatusEnum } from "../Enums/Order-status-enum";
import { OrderDetailVM } from "../Models/OrderDetailVM";
import DiscountCoupon from "../../../db/Models/DiscountCoupon.model";
import PaymentMethod from "../../../db/Models/PaymentMethod.model";
import ShippingMethod from "../../../db/Models/Shipping/ShippingMethod.model";
import OrderItems from "../../../db/Models/Order/OrderItems.model";
import Product from "../../../db/Models/Products/Product.model";
import Variant from "../../../db/Models/Variant.model";
import Size from "../../../db/Models/Size.model";

export const getOrdersRepository = async (search: OrderSearchDTO): Promise<OrderVM> => {
    const response = new OrderVM();
    const offset = (search.Pagination.Page - 1) * search.Pagination.Limit;

    const orders = await Order.findAll({
        where: {
            ...(search.orderNumber && { OrderNumber: search.orderNumber }),
            ...(search.StartDate && search.EndDate && { DateCreated: { [Op.between]: [search.StartDate, search.EndDate] } })
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: ["Name"],
                ...(search.customerName && { where: { Name: { [Op.like]: `%${search.customerName}%` } } })
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Id", "Name", "Color"],
                ...(search.orderStatus && search.orderStatus !== OrderStatusEnum.All && { where: { Id: search.orderStatus } })
            }
        ],
        offset,
        limit: search.Pagination.Limit
    });

    if (orders.length > 0) {
        response.Items = orders.map(mapOrdersDBToVM);
        response.TotalItems = await getQuantityOders(search);
    } else {
        response.setWarning(Errors.OrdersNotFound);
    }

    return response;
};

export const getOrderDetailByIdRepository = async (orderId: number): Promise<OrderDetailVM> => {
    const response = new OrderDetailVM();

    const order = await Order.findOne({
        where: {
            ...(orderId && { Id: orderId })
        },
        include: [
            {
                model: DiscountCoupon,
                as: "DiscountCoupon",
                attributes: ["Name"],
                required: false
            },
            {
                model: PaymentMethod,
                as: "PaymentMethod",
                attributes: ["Name"],
                required: false
            },
            {
                model: ShippingMethod,
                as: "ShippingMethod",
                attributes: ["Name"],
                required: false
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name"],
            },
            {
                model: User,
                as: "User",
                attributes: ["Name"],
            },
            {
                model: OrderItems,
                as: "OrderItems",
                attributes: ["Id", "Quantity", "UnitPrice", "TotalPrice"],
                include: [
                    {
                        model: Variant,
                        as: 'Variant',
                        include: [
                            {
                                model: Product,
                                as: 'Product',
                                attributes: ['Name']
                            },
                            {
                                model: Size,
                                as: 'Size',
                                attributes: ['Name']
                            }
                        ]
                    }
                ]
            }
        ],
    });

    if (order) {
        response.Items = mapOrderDetailDBToVm(order);
    } else {
        response.setWarning(Errors.OrdersNotFound);
    }

    return response;
};

export const getQuantityOders = async (search: OrderSearchDTO): Promise<number> => {
    return await Order.count({
        where: {
            ...(search.orderNumber && { OrderNumber: search.orderNumber })
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: ["Name"],
                ...(search.customerName && { where: { Name: { [Op.like]: `%${search.customerName}%` } } })
            },
            {
                model: OrderStatus,
                as: "OrderStatus",
                attributes: ["Name"],
                ...(search.orderStatus && { where: { Id: search.orderStatus } })
            }
        ]
    });
};

export const getOrderStatusByIdRepository = async (statusId: number): Promise<OrderStatus | null> => {
    return await OrderStatus.findOne({ where: { Id: statusId } });
};

export const changeStatusOrderRepository = async (orderStatusId: number, orderId: number): Promise<ResponseMessages> => {
    const response = new ResponseMessages();

    const [affectedRow] = await Order.update({ OrderStatusId: orderStatusId }, { where: { Id: orderId } });

    if (affectedRow > 0) {
        response.setSuccess(Success.StatusChanged);
    } else {
        response.setError(Errors.StatusCahnge);
    }

    return response;
};

export const getOrderStatusRepository = async (): Promise<OrderStatusVM> => {
    const response = new OrderStatusVM();

    const orderStatusDB = await OrderStatus.findAll();

    if (orderStatusDB.length > 0) {
        response.Items = orderStatusDB.map(mapOrderStatusDBToVM);
    } else {
        response.setError(Errors.OrderStatusNotFound);
    }

    return response;
};
