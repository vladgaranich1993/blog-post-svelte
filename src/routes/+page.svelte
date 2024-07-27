<script lang="ts">
  import { onMount } from 'svelte';
  import userStore from '$lib/userStore';
  import { auth, onAuthStateChanged } from '$lib/firebase';
  import type { User } from 'firebase/auth';
  import Header from '$lib/components/Header.svelte';
  import AuthForm from '$lib/components/AuthForm.svelte';
  import BlogPostForm from '$lib/components/BlogPostForm.svelte';
  import BlogPostList from '$lib/components/BlogPostList.svelte';
  import '../styles.css'

  let user: User | null = null;
  $: user = $userStore;

  onMount(() => {
    onAuthStateChanged(auth, (u) => {
      userStore.set(u);
    });
  });
</script>
{#if user}
  <Header />
{/if}
{#if !user}
<div class="flex items-center h-screen w-full">
  <AuthForm />
</div>
{/if}
{#if user}
  <BlogPostForm />
  <BlogPostList />
{/if}
<main>
  <slot />
</main>
