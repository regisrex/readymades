<script lang="ts">
	import { Icon, XMark } from 'svelte-hero-icons';

	export let error: string = '';

	const clearError = () => {
		error = '';
	};
</script>

{#if error != ''}
	<div>
		<div
			class="w-full p-4 bg-red-100 text-red-500 border flex items-center justify-between border-red-300 rounded-lg"
		>
			<span> {error}</span>
			<button on:click={clearError}
				><Icon src={XMark} class="w-5 h-5 text-red-500 cursor-pointer" /></button
			>
		</div>
	</div>
{/if}
