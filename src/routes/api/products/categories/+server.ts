import { ApiResponse, errorHandler } from "$lib/server/apiResponse";
import { prisma } from "$lib/server/database";
import { type ProductCategory } from "@prisma/client";
import type { RequestEvent } from "./$types";
import { categorySchema, updateCategorySchema, type ICategory } from "./dtos";


export async function GET(event: RequestEvent) {
    try {
        const categoryId = new URL(event.request.url).searchParams.get("categoryId")
        if (categoryId) {
            const category = await prisma.productCategory.findUnique({
                where: { id: categoryId },
                include: { products: true }
            })
            if (!category) throw new Error("Product not found")
            return ApiResponse(200, true, 'Category fetched', category)
        }

        const categories = await prisma.productCategory.findMany({
            include: {
                products: {
                    take: 10
                }
            }
        })
        return ApiResponse(200, true, "Categories fetched", categories)

    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(event: RequestEvent) {
    try {

        const data: ICategory = categorySchema.parse(await event.request.json())
        const category = await prisma.productCategory.create({
            data: {
                ...data
            }
        })
        return ApiResponse<ProductCategory>(200, true, 'Category Added', category)

    } catch (error: any) {
        return errorHandler(error)
    }
}


export async function PUT(event: RequestEvent) {
    try {

        const categoryId = new URL(event.request.url).searchParams.get("categoryId")
        if (!categoryId) throw new Error("No categoryId provided")

        const data = updateCategorySchema.parse(await event.request.json())
        let updatedProduct = await prisma.productCategory.update({
            where: { id: categoryId },
            data: {
                title: data.title,
                description: data.description,
            }
        })

        return ApiResponse(200, true, "Changes saved", updatedProduct)

    } catch (error: any) {
        return errorHandler(error)
    }
}
export async function DELETE(event: RequestEvent) {
    try {
        const categoryId = new URL(event.request.url).searchParams.get("categoryId")
        if (!categoryId) throw new Error("No categoryId provided")
        const deletedCategory = await prisma.productCategory.delete({ where: { id: categoryId } })
        return ApiResponse(200, true, 'Category deleted', deletedCategory)
    } catch (error) {
        return errorHandler(error)
    }
}