<script lang="ts">
	export let placeholder: string;
	export let label: string;
	export let value: any;
	export let type: 'text' | 'textarea' | 'select' | 'email' | 'password' | 'number';
	export let options: any[] = [];
</script>

<div class="w-full flex flex-col gap-2">
	{#if label.trim() !== ''}
		<span class="text-label">{label}</span>
	{/if}

	{#if type !== 'textarea' && type !== 'select'}
		<input
			{type}
			class="w-full border border-[#F0F4FD] placeholder:text-brand-lightblack/40 placeholder:text-sm h-[40px] rounded-md px-5 focus:ring-brand-darkblue/50 focus:ring-2 duration-100 outline-none"
			{placeholder}
			on:input={(e) =>
				(value = type == 'number' ? e.currentTarget.valueAsNumber : e.currentTarget.value)}
		/>
	{:else if type === 'textarea'}
		<textarea
			class="w-full border border-[#F0F4FD] placeholder:text-brand-lightblack/40 placeholder:text-sm h-[40px] rounded-md px-5 min-h-[140px] outline-none py-3 resize-none focus:ring-brand-darkblue/50 focus:ring-2 duration-100"
			{placeholder}
			bind:value
		/>
	{:else}
		<select
			class="w-full border border-[#F0F4FD] placeholder:text-brand-lightblack/40 placeholder:text-sm h-[40px] rounded-md px-5 outline-none focus:ring-brand-darkblue/50 focus:ring-2 duration-100"
			bind:value
		>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{/if}
</div>
