import z from 'zod'
export interface IProductOnOrder {
    productId: string,
    count: number
}

export interface IOrder {
    address: string
    phoneNumber: string
    orderName: string,
    orderedProducts: IProductOnOrder[]
}
export const orderSchema = z.object({
    address: z.string().min(3),
    phoneNumber: z.string().min(10),
    orderName: z.string().min(3),
    orderedProducts: z.array(z.object({
        productId: z.string().uuid(),
        count: z.number().default(1)
    }))
})
export const updateOrderSchema = z.object({
    status: z.enum(["INITIATED", "ON_DELIVERY", "DELIVERED"]),
    personalOrderId: z.string().optional(),
    orderId: z.string().uuid().optional()
})
