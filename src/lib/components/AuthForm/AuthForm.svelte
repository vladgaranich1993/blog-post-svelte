<script lang="ts">
    import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '$lib/firebase';
    import { createEventDispatcher } from 'svelte';
    import userStore from '$lib/userStore';
    import type { User } from 'firebase/auth';
    import './AuthForm.css'

    let email: string = '';
    let password: string = '';
    let error: string | null = null;
    let isRegister: boolean = false;
    let confirmPassword: string = '';
  
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
  </script>
  
  <div class="auth-form-container">
    {#if user}
      <p>Welcome, {user.email}</p>
      <button on:click={handleLogout}>Logout</button>
    {:else}
      <form class="auth-form" on:submit|preventDefault={isRegister ? handleSignup : handleLogin}>
        <div class="auth-form-buttons">
          <label>
            Email:
            <input type="email" bind:value={email} required />
          </label>
          <label>
            Password:
            <input type="password" bind:value={password} required />
          </label>
          {#if isRegister}
            <label>
              Confirm Password:
              <input type="password" bind:value={confirmPassword} required />
            </label>
          {/if}
        </div>
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <button type="button" on:click={() => isRegister = !isRegister}>
          {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </button>
        {#if error}
          <p style="color: red;">{error}</p>
        {/if}
      </form>
    {/if}
  </div>
