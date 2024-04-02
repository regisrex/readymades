<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Section from '$lib/layouts/Section.svelte';
	import { Icon, ShoppingBag } from 'svelte-hero-icons';
	let navLinks = [
		{
			title: 'Products',
			url: '/products'
		},
		{
			title: 'Orders',
			url: '/orders'
		},
		{
			title: 'About us',
			url: '/about-us'
		},
		{
			title: 'Contact us',
			url: 'contact-us'
		}
	];
</script>

<header>
	<Section about="Navigation bar" class="py-5 border-b border-brand/20">
		<nav class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<a href="/">
					<Logo />
				</a>
				<ul class="flex items-center gap-3">
					{#each navLinks as navLink}
						<li>
							<a
								aria-current={$page.url.pathname.startsWith(navLink.url) ? 'true' : 'false'}
								href={navLink.url}
							>
								{navLink.title}</a
							>
						</li>
					{/each}
				</ul>
			</div>
			<div class="flex items-center gap-4">
				<button><Icon src={ShoppingBag} class="w-5 h-5 " /></button>
				<Button variant="secondary" onclick={() => {}}>Place an order</Button>
			</div>
		</nav>
	</Section>
</header>

<style>
	[aria-current='true'] {
		font-weight: bold;
	}
</style>
