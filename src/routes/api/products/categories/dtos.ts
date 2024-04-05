import z from 'zod'
export interface ICategory {
    title: string,
    description: string
}


export const categorySchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1)
})


export const updateCategorySchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional()
})

