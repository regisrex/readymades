<script>
	import { page } from '$app/stores';
	import { Icon, NoSymbol } from 'svelte-hero-icons';
</script>

<div class="flex items-center justify-center h-[70vh]">
	<div class="w-fit h-fit flex flex-col items-center">
		<Icon src={NoSymbol} class="w-14 h-14" />
		<h1 class="font-fraunces text-2xl">{$page.status}: {$page.error?.message}</h1>
	</div>
</div>
