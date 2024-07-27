<script lang="ts">
  import { onMount } from 'svelte';
  import { deleteDoc, doc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { posts, fetchPosts, error } from '$lib/posts';
  import BlogPost from './BlogPost.svelte';

  async function handleDeletePost(postId) {
    try {
      await deleteDoc(doc(db, 'posts', postId.detail));
      fetchPosts();
    } catch (e) {
      console.error(error)
    }
  }

  onMount(() => {
    fetchPosts();
  });
</script>
  
  <div>
    {#if error}
      <p class="text-red-500">{error}</p>
    {/if}
    {#if $posts.length === 0}
      <p>No posts available.</p>
    {:else}
      {#each $posts as post}
        <BlogPost
          title={post.title}
          content={post.content}
          postUser={post.user}
          postTime={post.timestamp}
          postId={post.id}
          on:deletePost={handleDeletePost}
        />
      {/each}
    {/if}
  </div>
  