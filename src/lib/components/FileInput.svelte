<script lang="ts">
	import axios from '$lib/client/axios';
	import toast from 'svelte-french-toast';
	import Error from './Error.svelte';

	export let value: string | null;
	export let label: string | null;

	let fileInputId = Math.random().toString(32).substring(6);

	let loading = false;
	const handleLoad = async (e: any) => {
		try {
			loading = true;
			const file = e.target.files![0] as File;
			if (file) {
				const filename = file.name;
				const fileStream = await convertToBase64(file);

				const res = await axios.post('/files', {
					file: fileStream,
					filename
				});
				if (!res.data.success) throw new Error(res.data.message);
				value = res.data.data;
			}
		} catch (error: any) {
			toast(error.message);
		} finally {
			loading = false;
		}
	};

	const convertToBase64 = (file: File) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleRemove = async () => {
		if (value) {
			loading = true;
			const res = await axios.delete('/files', {
				params: {
					fileurl: value
				}
			});
			if (!res.data.success) throw new Error(res.data.message);
			loading = false;
			value = null;
		}
	};
</script>

<div class="relative flex flex-col gap-2">
	{#if label && label.trim() != ''}
		<span>{label}</span>
	{/if}

	<div
		class="w-full flex items-center justify-between border border-[#F0F4FD] placeholder:text-brand-lightblack/40 placeholder:text-sm h-[50px] rounded-md px-5 outline-none resize-none focus:ring-brand-darkblue/50 focus:ring-2 duration-100"
	>
		<p>{loading ? 'Processing...' : value ? value.split('/').pop() : 'Choose a file'}</p>
		{#if !value}
			<label for={fileInputId} class="cursor-pointer ml-auto">
				<input type="file" class="hidden" id={fileInputId} on:change={handleLoad} />
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 h-5"
				>
					<path
						d="M17 9.00195C19.175 9.01395 20.353 9.11095 21.121 9.87895C22 10.758 22 12.172 22 15V16C22 18.829 22 20.243 21.121 21.122C20.243 22 18.828 22 16 22H8C5.172 22 3.757 22 2.879 21.122C2 20.242 2 18.829 2 16V15C2 12.172 2 10.758 2.879 9.87895C3.647 9.11095 4.825 9.01395 7 9.00195"
						stroke="#51697F"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
					<path
						d="M12 15V2M12 2L15 5.5M12 2L9 5.5"
						stroke="#51697F"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</label>
		{:else}
			<button on:click={handleRemove}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
</div>
