import { prisma } from '$lib/server/database'

export async function load() {

    const products = await prisma.product.findMany({
        include: {
            category: {
                select: {
                    id: true,
                    title: true,
                    description: true
                }
            }
        }
    })


    const categories = await prisma.productCategory.findMany({})
    return {
        products,
        categories,
    }
}



