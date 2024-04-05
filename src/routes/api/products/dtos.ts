import z from "zod"
export interface IProduct {
    title: string
    description: string
    isAvailable: boolean
    price: number
    category: string
    image: string
}

export const productSchema = z.object({
    title: z.string().min(1),
    description: z.string().default("Ready prepared"),
    isAvailable: z.boolean().default(false),
    price: z.number().nonnegative(),
    category: z.string().uuid(),
    image: z.string().url().default("https://res.cloudinary.com/dzuq9e15n/image/upload/v1712346108/food-placeholder_dv5v51.jpg")
})

export const updateProductSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    isAvailable: z.boolean().default(false).optional(),
    price: z.number().nonnegative().optional(),
    category: z.string().uuid().nullable(),
    image: z.string().url().optional()
})