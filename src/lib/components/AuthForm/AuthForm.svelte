<script lang="ts">
    import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '$lib/firebase';
    import { createEventDispatcher } from 'svelte';
    import userStore from '$lib/userStore';
    import type { User } from 'firebase/auth';
    import { sendPasswordResetEmail } from 'firebase/auth';

    let email: string = '';
    let password: string = '';
    let error: string | null = null;
    let isRegister: boolean = false;
    let confirmPassword: string = '';
    let resetEmailSent: boolean = false;
    let isResetPassword: boolean = false;
  
    let user: User | null = null;
    $: user = $userStore;
  
    const dispatch = createEventDispatcher();
  
    async function handleLogin() {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch('login');
        error = null;
      } catch (e: Event) {
        error = e.message;
      }
    }
  
    async function handleSignup() {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch('signup');
      error = null;
    } catch (e: Event) {
      error = e.message;
    }
  }
  
    async function handleLogout() {
      try {
        await auth.signOut();
        dispatch('logout');
        error = null;
      } catch (e: Event) {
        error = e.message;
      }
    }
    function handleGoogleLogin() {
        signInWithPopup(auth, new GoogleAuthProvider());
    }

  async function handleForgotPassword() {
    console.log('reset pw')
    try {
      await sendPasswordResetEmail(auth, email);
      resetEmailSent = true;
      error = null;
    } catch (e) {
      error = e.message;
    }
  }

  function toggleResetPassword() {
    isResetPassword = !isResetPassword;
    resetEmailSent = false;
    error = null;
  }
    
  </script>
  
  <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
    {#if user}
      <p>Welcome, {user.email}</p>
      <button on:click={handleLogout}>Logout</button>
    {:else}
    {#if isResetPassword}
      <form on:submit|preventDefault={handleForgotPassword}>
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
        <button type="submit">Send Password Reset Email</button>
        <button type="button" on:click={toggleResetPassword}>Back to Login</button>
      </form>
    {:else}
    <form on:submit|preventDefault={isRegister ? handleSignup : handleLogin}>
      <div>
        <label>
          Email:
          <input class="mt-2 w-full border rounded p-2 outline-none focus:shadow-outline" type="email" bind:value={email} required />
        </label>
        {#if !isResetPassword}
          <label>
            Password:
            <input class="mt-2 w-full border rounded p-2 outline-none focus:shadow-outline" type="password" bind:value={password} required />
          </label>
        {/if}
        {#if isRegister}
          <label>
            Confirm Password:
            <input class="mt-2 w-full border rounded p-2 outline-none focus:shadow-outline" type="password" bind:value={confirmPassword} required />
          </label>
        {/if}
      </div>
      <div class="flex flex-col">
        <button class="mt-2 bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <button class="mt-2 bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" on:click={handleGoogleLogin}>Login With Google Account</button>
        <button class="mt-2 bg-purple-500 hover:bg-purple-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="button" on:click={() => isRegister = !isRegister}>
          {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </button>
        {#if !isRegister}
        <button class="mt-5 underline text-blue-700 text-center text-sm" on:click={toggleResetPassword}>
          Forgot Password?
        </button>
          {#if resetEmailSent}
            <p class="text-green-700">Password reset email sent. Check your inbox.</p>
          {/if}
          {/if}
      </div>
      {#if error}
        <p class="text-red-700">{error}</p>
      {/if}
    </form>
    {/if}
  {/if}
  </div>
