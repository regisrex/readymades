<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from '$lib/client/axios';
	import Button from '$lib/components/Button.svelte';
	import Error from '$lib/components/Error.svelte';
	import Input from '$lib/components/Input.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import toast from 'svelte-french-toast';

	let error = '';
	let loading = false;

	let credentials = {
		email: '',
		password: ''
	};

	const handleLogin = async () => {
		error = '';
		try {
			loading = true;
			if (Object.values(credentials).some((v) => v.trim() == '')) {
				error = 'Fill in all fields';
				return;
			}
			const res = await axios.post('/auth?for=login', credentials);
			if (!res.data.success) throw new Error(res.data.message);
			toast.success(res.data.message);
			localStorage.setItem('token', res.data.data.token);
			goto('/admin/0/analytics');
		} catch (err: any) {
			error = err.message || 'Aww, try again';
		} finally {
			loading = false;
		}
	};
</script>

<body class="bg-white min-h-screen w-screen flex items-center justify-center">
	<div class="w-96 bg-white p-10 flex flex-col gap-4 rounded-md">
		<Logo />
		<div>
			<h1 class="text-black font-bold text-2xl">Sign in</h1>
			<p>Enter the admin panel of Readymade site.</p>
		</div>
		<Error errorMessage={error} />
		<div class="flex flex-col gap-4">
			<Input
				placeholder="admin@readymade.rw"
				label="Email address"
				type="text"
				bind:value={credentials.email}
			/>
			<Input
				placeholder="••••••"
				label="Password"
				type="password"
				bind:value={credentials.password}
			/>
		</div>
		<Button variant="primary" class="w-fit" onclick={handleLogin} {loading}>Sign in</Button>
	</div>
</body>
