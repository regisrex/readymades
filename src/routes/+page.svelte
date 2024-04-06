<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	let name: string = '';
</script>

<svelte:head>
	<title>Readymade LTD</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<!-- <Hero /> -->
	<div class="p-32">
		<h1 class="text-6xl">{name}</h1>
		<Input label="name" placeholder="Enter name" type="textarea" bind:value={name} />
	</div>
</section>
