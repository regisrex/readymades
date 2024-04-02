<script>
	import Button from '$lib/components/Button.svelte';
	import Section from '$lib/layouts/Section.svelte';
	import { Icon, PlayCircle } from 'svelte-hero-icons';
</script>

<Section about="Hero section" class="grid grid-cols-2 gap-10 py-10">
	<div class="flex flex-col gap-10">
		<div class="flex flex-col gap-3">
			<p class="text-brand tracking-widest">READYMADE COMPANY LTD.</p>
			<h1 class="font-fraunces text-5xl text-black font-black">
				You got no time to peel those potatoes, we already did that for you
			</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec accumsan sem, at
				ultricies lacus. Aenean eu blandit urna. Sed cursus tristique efficitur.
			</p>
			<Button onclick={() => {}} variant="primary" class="w-fit bg-black">Our products</Button>
		</div>
		<div class="relative rounded-lg w-full overflow-hidden h-fit">
			<img
				class="h-[220px] w-full relative object-cover"
				src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
			/>
			<div class="bg-gradient-to-b from-transparent to-black bottom-0 absolute w-full p-3">
				<Button variant="tertiary" class="flex items-center gap-2">
					<Icon src={PlayCircle} class="w-4 h-4" /> <span>See us in action</span></Button
				>
			</div>
		</div>
	</div>
</Section>
