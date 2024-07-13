<script lang="ts">
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import userStore from '$lib/userStore';
    import { auth, onAuthStateChanged } from '$lib/firebase';
    import type { User } from 'firebase/auth';
  
    let user: User | null = null;
    $: user = $userStore;
  
    onMount(() => {
      onAuthStateChanged(auth, (u) => {
        userStore.set(u);
      });
    });
  </script>
  
  <Header {user} />
  <main>
    <slot />
  </main>
  