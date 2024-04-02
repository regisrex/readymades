<script>
	import Header from './Nav.svelte';
	import './styles.css';
</script>

<div class="app font-sans text-sm text-normal">
	<Header />
	<main>
		<slot />
	</main>
</div>
