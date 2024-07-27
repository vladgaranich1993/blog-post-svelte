<script lang="ts">
  import { auth, signOut } from '$lib/firebase';
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
</script>

<header class="flex items-center justify-between w-full bg-white shadow-lg px-5 py-5">
  {#if user}
    <h4 class="font-bold">
      Hello, {user.email}
    </h4>
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
      on:click={handleLogout}>
        Logout
      </button>
  {/if}
</header>
