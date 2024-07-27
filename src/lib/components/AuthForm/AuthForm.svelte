<script lang="ts">
  import LoginForm from '../LoginForm/LoginForm.svelte';
  import RegisterForm from '../RegisterForm/RegisterForm.svelte';
  import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm.svelte';
  import userStore from '$lib/userStore';
  import type { User } from 'firebase/auth';

  let isRegister: boolean = false;
  let isResetPassword: boolean = false;
  let user: User | null = null;
  $: user = $userStore;

  function toggleForm() {
    isRegister = !isRegister;
  }

  function toggleResetPassword() {
    isResetPassword = !isResetPassword;
  }

  function handleCancel() {
    isResetPassword = false;
  }
</script>

<div class="flex flex-col w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
  {#if isResetPassword}
    <ResetPasswordForm on:toggleResetPassword={toggleResetPassword} on:cancel={handleCancel}/>
  {:else if isRegister}
    <RegisterForm />
    <button class="mt-2 bg-purple-500 hover:bg-purple-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" on:click={toggleForm}>
      Already have an account? Login
    </button>
  {:else}
    <LoginForm />
    <button class="mt-2 bg-purple-500 hover:bg-purple-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" on:click={toggleForm}>
      Don't have an account? Register
    </button>
    <button class="mt-5 text-blue-700 underline" on:click={toggleResetPassword}>
      Forgot Password?
    </button>
  {/if}
</div>