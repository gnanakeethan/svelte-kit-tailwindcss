<script>
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: '',
			email: ''
		},
		validationSchema: yup.object().shape({
			title: yup
				.string()
				.oneOf(['Mr.', 'Mrs.', 'Mx.'])
				.required(),
			password: yup
				.string()
				.required(),
			email: yup
				.string()
				.email()
				.required()
		}),
		onSubmit: values => {
			alert(JSON.stringify(values));
		}
	});
</script>
<svelte:head>
	<title>Login Page</title>
</svelte:head>
<form style="height:100vh" class='mx-auto w-2/3 md:w-1/2 lg:w-1/4 h-[100vh] flex flex-col justify-center transition-all duration-[1s] w-full'
      on:submit={handleSubmit}>
	<div class='flex flex-col items-start py-2'>
		<label for='email'>Email</label>
		<input
			class='w-full'
			type='email'
			id='email'
			name='email'
			on:change={handleChange}
			bind:value={$form.email}
		/>
		{#if $errors.email}
			<small>{$errors.email}</small>
		{/if}
	</div>
	<div class='flex flex-col items-start py-2'>
		<label for='password'>Password</label>
		<input
			class='w-full'
			type='password'
			id='password'
			name='password'
			on:change={handleChange}
			bind:value={$form.password}
		/>
		{#if $errors.password}
			<small>{$errors.password}</small>
		{/if}
	</div>
	<button type='submit' class='my-2 p-3 bg-red-300/50 hover:bg-green-700/25 hover:text-white mx-auto w-1/2 transition duration-200'>
		submit
	</button>
</form>
