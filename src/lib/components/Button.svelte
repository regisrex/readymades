<script lang="ts">
	import { ArrowPath, Icon } from 'svelte-hero-icons';

	export let onclick: () => void = () => {};
	export let variant: 'primary' | 'secondary' | 'tertiary';
	let className: string = '';
	export { className as class };
	export let loading: boolean = false;
</script>

<button
	on:click={onclick}
	class="h-[40px] px-6 duration-100 rounded-lg flex items-center justify-center gap-2 min-w-36 {variant ==
	'primary'
		? 'bg-brand text-white hover:bg-black'
		: variant == 'secondary'
			? 'bg-white text-brand border border-brand hover:bg-brand hover:text-white'
			: 'bg-brand/10 text-brand hover:bg-brand/20 '} {className}"
>
	{#if loading}
		<Icon src={ArrowPath} class="animate-spin w-5 h-5" />
	{/if}
	<div class="w-fit"><slot /></div>
</button>
