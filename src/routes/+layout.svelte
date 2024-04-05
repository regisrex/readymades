<script>
	import { page } from '$app/stores';
	import Nav from './Nav.svelte';
	import './styles.css';
</script>

<div class="app font-sans text-sm text-normal">
	{#if !$page.url.pathname.startsWith('/admin')}
		<Nav />
	{/if}
	<main>
		<slot />
	</main>
</div>
