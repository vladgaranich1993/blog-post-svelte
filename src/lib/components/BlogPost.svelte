<script lang="ts">
  export let title: string;
  export let content: string;
  export let postUser: string;
  export let postTime: any;
  export let postId: string;
  import userStore from '$lib/userStore';
  import type { User } from 'firebase/auth';

  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();

  let user: User | null = null;
  $: user = $userStore;

  function handleDelete() {
    dispatch('deletePost', postId);
  }
</script>

<div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-md md:mx-auto">
  <h2>{title}</h2>
  <p class="whitespace-break-spaces">{content}</p>
  <p>
    <small>By {postUser} on {new Date(postTime.toDate()).toLocaleString()}</small>
  </p>
  {#if user && user.email === postUser}
    <button
      class="mt-2 bg-red-500 hover:bg-red-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
      on:click={() => handleDelete()}>
        Delete
    </button>
  {/if}
</div>
