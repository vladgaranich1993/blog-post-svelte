<script lang="ts">
    import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '$lib/firebase';
    import { createEventDispatcher } from 'svelte';
    import userStore from '$lib/userStore';
    import type { User } from 'firebase/auth';
    import { sendPasswordResetEmail } from 'firebase/auth';
    import './AuthForm.css'

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
  
  <div class="auth-form-container">
    {#if user}
      <p>Welcome, {user.email}</p>
      <button on:click={handleLogout}>Logout</button>
    {:else}
    {#if isResetPassword}
      <form class="auth-form" on:submit|preventDefault={handleForgotPassword}>
        <div>
          <label>
            Email:
            <input type="email" bind:value={email} required />
          </label>
        </div>
        {#if resetEmailSent}
          <p style="color: green;">Password reset email sent. Check your inbox.</p>
        {/if}
        {#if error}
          <p style="color: red;">{error}</p>
        {/if}
        <button type="submit">Send Password Reset Email</button>
        <button type="button" on:click={toggleResetPassword}>Back to Login</button>
      </form>
    {:else}
    <form class="auth-form" on:submit|preventDefault={isRegister ? handleSignup : handleLogin}>
      <div class="auth-form-buttons">
        <label>
          Email:
          <input type="email" bind:value={email} required />
        </label>
        {#if !isResetPassword}
          <label>
            Password:
            <input type="password" bind:value={password} required />
          </label>
        {/if}
        {#if isRegister}
          <label>
            Confirm Password:
            <input type="password" bind:value={confirmPassword} required />
          </label>
        {/if}
      </div>
      <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
      <button on:click={handleGoogleLogin}>Login With Google Account</button>
      <button type="button" on:click={() => isRegister = !isRegister}>
        {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </button>
      {#if !isRegister}
      <button on:click={toggleResetPassword}>
        Forgot Password?
      </button>
        {#if resetEmailSent}
          <p style="color: green;">Password reset email sent. Check your inbox.</p>
        {/if}
      {/if}
      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
    </form>
    {/if}
  {/if}
  </div>
