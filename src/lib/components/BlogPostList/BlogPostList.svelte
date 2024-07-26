<script lang="ts">
    import { onMount } from 'svelte';
    import { deleteDoc, doc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import userStore from '$lib/userStore';
    import { posts, fetchPosts, error } from '$lib/posts';
    import type { User } from 'firebase/auth';
  
    let user: User | null = null;
    $: user = $userStore;
    async function handleDeletePost(postId: string) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        fetchPosts();
      } catch {
        error
      }
    }
  
    onMount(() => {
      fetchPosts();
    });
  </script>
  
  <div>
    {#if error}
      <p style="color: red;">{error}</p>
    {/if}
    {#if $posts.length === 0}
      <p>No posts available.</p>
    {:else}
      {#each $posts as post}
        <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-md md:mx-auto">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>
            <small>By {post.user} on {new Date(post.timestamp.toDate()).toLocaleString()}</small>
          </p>
          {#if user && user.email === post.user}
            <button on:click={() => handleDeletePost(post.id)}>Delete</button>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
  
  <style scoped>
    .posts-list, .post-container {
      margin-bottom: 1rem;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    h2 {
      margin: 0 0 0.5rem 0;
    }
    p {
      margin: 0.5rem 0;
    }
    small {
      color: #777;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 3px;
      background-color: #ff0000;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #cc0000;
    }
  </style>
  