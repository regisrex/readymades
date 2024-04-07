<script lang="ts">
	import axios from '$lib/client/axios';
	import { productsStore } from '$lib/client/store';
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import Input from '$lib/components/Input.svelte';
	import SectionTitle from '$lib/components/sectionTitle.svelte';
	import type { ProductWithCategory } from '$lib/types';
	import { type ProductCategory } from '@prisma/client';
	import toast from 'svelte-french-toast';
	import type { IProduct } from '../../../api/products/dtos';

	let loading = false;
	export let categories: ProductCategory[] = [];
	export let cancel: () => void;
	export let onsuccess: () => void;
	let product: IProduct = {
		title: '',
		description: 'string',
		isAvailable: true,
		price: 1000,
		category: categories.at(0)?.id || '',
		image: ''
	};

	const handleSubmit = async () => {
		try {
			loading = true;
			const res = await axios.post('/products', product);
			if (!res.data.success) throw new Error(res.data.message);
			productsStore.set([...$productsStore, res.data.data as ProductWithCategory]);
			onsuccess();
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

<div class="bg-white shadow-xl lg:w-[30vw] flex flex-col p-10 rounded-lg gap-5">
	<SectionTitle title="Add a product" description="Enter new product" />
	<div class="flex flex-col gap-2">
		<FileInput bind:value={product.image} label="Product image" />
		<Input type="text" bind:value={product.title} placeholder="Tomatoes" label="Title" />
		<Input
			type="text"
			bind:value={product.description}
			placeholder="Add a  description"
			label="Description"
		/>
		<Input type="number" bind:value={product.price} placeholder="Rwf" label="Price" />
		<Input
			type="select"
			bind:value={product.isAvailable}
			placeholder="Currently available?"
			label="Availability"
			options={[
				{ label: 'Yes', value: true },
				{ label: 'No', value: false }
			]}
		/>
		<Input
			type="select"
			bind:value={product.category}
			placeholder="Category"
			label="Category"
			options={categories.map((category) => {
				return { label: category.title, value: category.id };
			})}
		/>
	</div>
	<div class="flex items-center justify-between">
		<Button variant="primary" onclick={() => handleSubmit()} {loading}>Add Product</Button>
		<Button variant="tertiary" onclick={() => close()}>Cancel</Button>
	</div>
</div>
