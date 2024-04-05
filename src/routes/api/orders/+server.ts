import { ApiResponse, errorHandler } from "$lib/server/apiResponse";
import { prisma } from "$lib/server/database";
import { OrderStatus } from "@prisma/client";
import type { RequestEvent } from "./$types";
import { orderSchema, updateOrderSchema } from "./dtos";

export async function POST(event: RequestEvent) {
    try {

        const data = orderSchema.parse(await event.request.json())
        const personalOrderId = data.orderName.slice(0, 2).concat(Math.random().toString(32).substring(9)).toUpperCase()

        const order = await prisma.order.create({
            data: {
                ...data,
                orderedProducts: {
                    createMany: {
                        data: data.orderedProducts.map((orderedProduct) => {
                            return { productId: orderedProduct.productId, count: orderedProduct.count }
                        })
                    }
                },
                personalOrderId
            }
        })
        order.personalOrderId = "******"
        return ApiResponse(200, true, "Order created", order)

    } catch (error) {
        return errorHandler(error)
    }
}


export async function GET(event: RequestEvent) {
    try {
        const orderId = new URL(event.request.url).searchParams.get('orderId')
        if (orderId) {
            let order = await prisma.order.findUnique({ where: { id: orderId } })
            if (!order) throw new Error('Order not found')
            order.personalOrderId = "******"
            return ApiResponse(200, true, 'Order fetched', order)
        }
        const orders = await prisma.order.findMany({
            select: {
                personalOrderId: false
            }
        })
        return ApiResponse(200, true, 'Orders fetched', orders)
    } catch (error) {
        return errorHandler(error)
    }

}


export async function PUT(event: RequestEvent) {
    try {
        const { status, personalOrderId, orderId } = updateOrderSchema.parse(await event.request.json())
        if (status == OrderStatus.DELIVERED) {
            if (!personalOrderId) throw new Error("Provide you order code")
            const order = await prisma.order.update({
                where: {
                    personalOrderId
                },
                data: {
                    status: OrderStatus.DELIVERED
                }
            })
            return ApiResponse(200, true, 'Order delivered', order)
        }
        if (!orderId) throw new Error('Provide order id')
        let adminOrder = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status
            }
        })
        adminOrder.personalOrderId = "******"
        return ApiResponse(200, true, 'Order status updated', adminOrder)
    } catch (error) {
        return errorHandler(error)
    }
}