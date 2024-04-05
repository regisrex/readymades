import { ApiResponse, errorHandler } from "$lib/server/apiResponse";
import { prisma } from "$lib/server/database";
import { type Product } from "@prisma/client";
import type { RequestEvent } from "./$types";
import { productSchema, updateProductSchema, type IProduct } from "./dtos";


export async function GET(event: RequestEvent) {
    try {
        const productId = new URL(event.request.url).searchParams.get("productId")
        if (productId) {
            const product = await prisma.product.findUnique({
                where: { id: productId }
            })
            if (!product) throw new Error("Product not found")
            return ApiResponse(200, true, 'Product fetched', product)
        }

        const products = await prisma.product.findMany()
        return ApiResponse(200, true, "Products fetched", products)

    } catch (error) {
        return errorHandler(error)
    }
}

export async function POST(event: RequestEvent) {
    try {

        const data: IProduct = productSchema.parse(await event.request.json())
        const product = await prisma.product.create({
            data: {
                ...data,
                category: {
                    connect: {
                        id: data.category
                    }
                }
            },
            include: {
                category: true
            }
        })
        return ApiResponse<Product>(200, true, 'Product Added', product)

    } catch (error: any) {
        return errorHandler(error)
    }
}


export async function PUT(event: RequestEvent) {
    try {

        const productId = new URL(event.request.url).searchParams.get("productId")
        if (!productId) throw new Error("No productId provided")

        const data = updateProductSchema.parse(await event.request.json())
        let updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                title: data.title,
                description: data.description,
                image: data.image,
                isAvailable: data.isAvailable,
                price: data.price,
            },
            include: {
                category: true
            }
        })
        if (data.category) updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                category:
                {
                    connect: {
                        id: data.category
                    }
                }
            },
            include: {
                category: true
            }
        })
        return ApiResponse(200, true, "Changes saved", updatedProduct)

    } catch (error: any) {
        return errorHandler(error)
    }
}
export async function DELETE(event: RequestEvent) {
    try {
        const productId = new URL(event.request.url).searchParams.get("productId")
        if (!productId) throw new Error("No productId provided")
        const deletedProduct = await prisma.product.delete({ where: { id: productId } })
        return ApiResponse(200, true, 'Product deleted', deletedProduct)
    } catch (error) {
        return errorHandler(error)
    }

}