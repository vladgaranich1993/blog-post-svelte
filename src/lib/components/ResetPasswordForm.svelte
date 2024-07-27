<script lang="ts">
  import { auth, sendPasswordResetEmail } from '$lib/firebase';
  import { createEventDispatcher } from 'svelte';
  let email: string = '';
  let error: string | null = null;
  let resetEmailSent: boolean = false;
  const dispatch = createEventDispatcher()

  async function handleForgotPassword() {
    try {
      await sendPasswordResetEmail(auth, email);
      resetEmailSent = true;
      error = null;
    } catch (e: any) {
      error = e.message;
    }
  }
  function handleCancel() {
    dispatch('cancel');
  }
</script>

<form class="flex flex-col" on:submit|preventDefault={handleForgotPassword}>
  <div>
    <label>
      Email:
      <input class="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" bind:value={email} required />
    </label>
  </div>
  {#if resetEmailSent}
    <p class="text-green-700">Password reset email sent. Check your inbox.</p>
  {/if}
  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}
  <button class="mt-2 bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">
    Send Password Reset Email
  </button>
  <button class="mt-2 bg-gray-500 hover:bg-gray-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="button" on:click={handleCancel}>
    Back to Login
  </button>
</form>
