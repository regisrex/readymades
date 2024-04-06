import z from 'zod'

export const uploadSchema = z.object({
    file: z.string(),
    filename: z.string()
})
export const deleteSchema = z.object({
    file_url: z.string().url()
}) 