<script lang="ts">
	import { goto, pushState } from '$app/navigation';
	import { page } from '$app/stores';
	import { modalStore, productsStore } from '$lib/client/store';
	import Button from '$lib/components/Button.svelte';
	import Empty from '$lib/components/Empty.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import SectionTitle from '$lib/components/sectionTitle.svelte';
	import type { ProductWithCategory } from '$lib/types';
	import type { ProductCategory } from '@prisma/client';
	import { Icon, MagnifyingGlass, PlusCircle } from 'svelte-hero-icons';
	import AddProduct from './AddProduct.svelte';
	import ProductCard from './product.svelte';

	export let data: { products: ProductWithCategory[]; categories: ProductCategory[] };

	$: $productsStore = data.products;

	let query: string = '';

	let selectedCategory: ProductCategory | null = null;

	$: filtered = selectedCategory
		? $productsStore.filter((product) => product.category.id == selectedCategory!.id)
		: $productsStore;

	$: searchResults =
		query.length != 0
			? filtered.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))
			: filtered;

	const handleAddProduct = () => {
		$page.url.searchParams.set('addProduct', 'true');
		goto(`?${$page.url.searchParams.toString()}`);
		modalStore.set({
			...$modalStore,
			addProduct: true
		});
	};

	const handleCloseAddProduct = () => {
		modalStore.set({
			...$modalStore,
			addProduct: false
		});
		$page.url.searchParams.delete('addProduct');
		goto(`?${$page.url.searchParams.toString()}`);
	};
	const handleAddCategory = () => {
		pushState('?addCategory=true', {});
	};

	$: $modalStore.addProduct = $page.url.searchParams.get('addProduct') == 'true' ? true : false;
</script>

<div class="flex flex-col gap-10 w-full">
	<div class="flex items-center justify-between">
		<SectionTitle title="Products" description="All products that you offer" />
		<Button variant="secondary" onclick={handleAddProduct}>Add product</Button>
		<Modal showModal={$modalStore.addProduct}
			><AddProduct cancel={handleCloseAddProduct} onsuccess={handleCloseAddProduct} categories={data.categories} /></Modal
		>
		<!-- <Modal showModal={isAddingCategory}
			><AddCategory cancel={() => pushState('/admin/0/products', {})} /></Modal
		> -->
	</div>
	<section about="Menu bar" class="flex gap-2 justify-between">
		<div class="flex gap-2">
			<span class="text-black font-bold pr-4 py-2">Category</span>
			<button
				class={`px-4 py-2 rounded-lg  ${!selectedCategory ? 'bg-brand/10 font-medium border border-brand/20  text-brand' : 'border border-slate-200'}`}
				on:click={() => (selectedCategory = null)}
			>
				<h1>All</h1>
			</button>
			{#each data.categories as category}
				<button
					class={`px-4 py-2 rounded-lg  ${selectedCategory == category ? 'bg-brand/10 font-medium border border-brand/20  text-brand' : 'border border-slate-200'}`}
					on:click={() => (selectedCategory = category)}
				>
					<h1>{category.title}</h1>
				</button>
			{/each}
			<button
				class={`px-4 py-2 rounded-lg opacity-50 hover:opacity-100 `}
				on:click={handleAddCategory}
			>
				<span class="flex items-center gap-4"
					><Icon src={PlusCircle} class="w-4 h-4" /> <span>Add Category</span></span
				>
			</button>
		</div>
		<div class="flex gap-4 items-center">
			<Input label="" placeholder="Search here..." bind:value={query} type="text" />
			<Icon src={MagnifyingGlass} class="w-5 h-5" />
		</div>
	</section>
	{#if searchResults.length != 0}
		<div class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 msm:grid-cols-1 gap-2 w-full">
			{#each searchResults as product}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="w-full h-[50vh] flex items-center justify-center">
			<Empty />
		</div>
	{/if}
</div>
