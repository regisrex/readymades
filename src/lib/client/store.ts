import { type ProductWithCategory } from "$lib/types";
import { writable } from "svelte/store";

export const productsStore = writable<ProductWithCategory[]>([])
export const modalStore = writable<{ addProduct: boolean, addCategory: boolean }>({
    addProduct: false,
    addCategory: false
})

modalStore.subscribe((products) => {
    console.log(products)
})