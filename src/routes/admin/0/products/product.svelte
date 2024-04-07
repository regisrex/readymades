<script lang="ts">
	import axios from '$lib/client/axios';
	import { productsStore } from '$lib/client/store';
	import Error from '$lib/components/Error.svelte';
	import type { ProductWithCategory } from '$lib/types';
	import toast from 'svelte-french-toast';
	import { EllipsisHorizontal, Icon } from 'svelte-hero-icons';

	export let product: ProductWithCategory;

	let showOptionsModal: boolean = false;

	const handleDelete = () =>
		new Promise<void>((resolve, reject) => {
			axios
				.delete('/products', {
					params: {
						productId: product.id
					}
				})
				.then(function (res) {
					if (!res.data.success) throw new Error(res.data.message);
					productsStore.set($productsStore.filter((p) => p.id != product.id));
					resolve();
				})
				.catch(function (error) {
					reject(error.message);
				});
		});
	const onDelete = () =>
		toast.promise(handleDelete(), {
			loading: 'Deleting...',
			success: `${product.title} deleted`,
			error: `Delete action failed`
		});
</script>

<div class="w-full bg-white border border-slate-200 rounded-lg">
	<img
		src={product.image}
		alt=""
		class="w-full h-40 bg-slate-100 rounded-t-lg object-cover"
		loading="lazy"
	/>
	<div class="p-3">
		<h1 class="font-bold">{product.title}</h1>
		<h1>{product.description}</h1>
		<div class="flex items-center justify-between">
			<span class="text-brand">{product.price} $</span>
			<button
				on:click={() => (showOptionsModal = true)}
				on:mouseleave={() => {
					if (showOptionsModal) showOptionsModal = false;
				}}
				class="w-10 h-10 bg-brand/10 text-brand flex relative items-center justify-center rounded-md"
			>
				<Icon src={EllipsisHorizontal} class="w-5 h-5" />
				{#if showOptionsModal}
					<div
						class="border flex py-6 flex-col gap-0 rounded-lg bg-white -bottom-[60px] left-[30px] w-[160px] absolute shadow shadow-slate-200"
					>
						<button
							on:click={() => onDelete()}
							class="py-2 px-4 border-b border-slate-100 hover:bg-slate-100 text-red-500"
							>Delete</button
						>
						<button class="py-2 px-4 border-b border-slate-100 hover:bg-slate-100 text-normal"
							>Toggle Availability</button
						>
						<button class="py-2 px-4 hover:bg-slate-100 text-normal">Edit details</button>
					</div>
				{/if}
			</button>
		</div>
	</div>
</div>
