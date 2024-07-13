<script lang="ts">
  import { auth, signOut } from '$lib/firebase';
  import { createEventDispatcher } from 'svelte';
  import userStore from '$lib/userStore';
  import type { User } from 'firebase/auth';
  import './Header.css'

  let user: User | null = null;
  $: user = $userStore;

  const dispatch = createEventDispatcher();

  function handleLogout() {
    signOut(auth);
    dispatch('logout');
  }

  
</script>

<header class="header">
  {#if user}
    <button on:click={handleLogout}>Logout</button>
  {/if}
</header>
