<script lang="ts">
	export let onclick: () => void = () => {};
	export let variant: 'primary' | 'secondary' | 'tertiary';
	let className: string = '';
	export { className as class };
</script>

<button
	on:click={onclick}
	class="h-[50px] px-6 duration-100 rounded-full {variant == 'primary'
		? 'bg-brand text-white hover:bg-black'
		: variant == 'secondary'
			? 'bg-white text-brand border border-brand hover:bg-brand hover:text-white'
			: 'bg-brand/10 text-brand hover:bg-brand/20 '} {className}"
>
	<slot />
</button>
