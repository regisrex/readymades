<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';

	onMount(() => {
		if ($page.url.href.includes('login'))
			if (localStorage.getItem('token')) {
				goto('/admin/0/analytics');
			}
	});
</script>

<div>
	<Toaster />
	<slot />
</div>
