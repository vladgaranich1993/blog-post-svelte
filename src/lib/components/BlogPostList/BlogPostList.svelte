<script lang="ts">
    import { onMount } from 'svelte';
    import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import { writable } from 'svelte/store';
    import userStore from '$lib/userStore';
    import type { User } from 'firebase/auth';
  
    let user: User | null = null;
    $: user = $userStore;
  
    let posts = writable([]);
    let error: string | null = null;
  
    async function fetchPosts() {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        let fetchedPosts = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() });
        });
        posts.set(fetchedPosts);
        error = null;
      } catch (e) {
        error = e.message;
      }
    }
  
    async function handleDeletePost(postId: string) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        fetchPosts();
      } catch (e) {
        error = e.message;
      }
    }
  
    onMount(() => {
      fetchPosts();
    });
  </script>
  
  <div class="posts-list">
    {#if error}
      <p style="color: red;">{error}</p>
    {/if}
    {#if $posts.length === 0}
      <p>No posts available.</p>
    {:else}
      {#each $posts as post}
        <div class="post-container">
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
  