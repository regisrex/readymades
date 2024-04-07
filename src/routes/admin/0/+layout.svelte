<script>
	const links = [
		// {
		// 	title: 'Analytics',
		// 	href: '/admin/0/products'
		// },
		{
			title: 'Producuts',
			href: '/admin/0/products'
		},
		{
			title: 'Orders',
			href: '/admin/0/products'
		},
		{
			title: 'Admins',
			href: '/admin/0/products'
		}
	];
</script>

<div class="min-h-screen p-12 flex">
	<!-- <div class="w-fit flex flex-col pr-6 border-r border-slate-200"> -->
	<!-- <Logo /> -->

	<!-- <div class="flex flex-col gap-0c">
			{#each links as link}
				<a
					href={link.href}
					class="flex items-center gap-4 p-3 w-full hover:bg-black hover:text-white"
				>
					<Icon src={CubeTransparent} class="w-4 h-4" />
					<span> {link.title}</span>
				</a>
			{/each}
		</div> -->
	<!-- </div> -->
	<div class="col-span-3 px-6 w-full">
		<slot />
	</div>
</div>
