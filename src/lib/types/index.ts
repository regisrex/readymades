import type { Product, ProductCategory } from "@prisma/client";

export interface ProductWithCategory extends Product {
    category : ProductCategory
}
