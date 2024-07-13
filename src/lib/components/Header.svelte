<script lang="ts">
  import { auth, signInWithPopup, GoogleAuthProvider, signOut } from '$lib/firebase';
  import { createEventDispatcher } from 'svelte';
  import userStore from '$lib/userStore';
  import type { User } from 'firebase/auth';

  let user: User | null = null;
  $: user = $userStore;

  const dispatch = createEventDispatcher();

  function handleLogout() {
    signOut(auth);
    dispatch('logout');
  }

  function handleLogin() {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
</script>

<header>
  <h1>My Blog</h1>
  {#if user}
    <button on:click={handleLogout}>Logout</button>
  {:else}
    <button on:click={handleLogin}>Login with Google</button>
  {/if}
</header>
