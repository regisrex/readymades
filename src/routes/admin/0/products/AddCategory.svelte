<script lang="ts">
	import axios from '$lib/client/axios';
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';
	import Input from '$lib/components/Input.svelte';
	import SectionTitle from '$lib/components/sectionTitle.svelte';
	import type { ICategory } from '../../../api/products/categories/dtos';
	export let cancel: () => void;

	let error: string = '';
	let category: ICategory = {
		title: '',
		description: 'string'
	};

	const handleSubmit = async () => {
		if (Object.values(category).some((v) => v.length == 0)) {
			error = 'Fill in all fields';
			return;
		}
		const res = await axios.post('/products/categories', category);
		console.log(res.data);
	};
</script>

<div class="bg-white shadow-xl lg:w-[30vw] p-10 flex flex-col gap-5 rounded-lg">
	<SectionTitle title="Add Category" description="Enter new category" />
	<Error bind:error />
	<div class="flex flex-col gap-2">
		<Input
			type="text"
			bind:value={category.title}
			placeholder="Milk products"
			label="Category name"
		/>
		<Input
			type="text"
			bind:value={category.description}
			placeholder="Add a  description"
			label="Description"
		/>
	</div>
	<div class="flex items-center justify-between">
		<Button variant="primary" onclick={handleSubmit}>Save</Button>
		<Button variant="tertiary" onclick={cancel}>Cancel</Button>
	</div>
</div>
