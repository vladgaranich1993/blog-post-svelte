<script lang="ts">
    import { collection, addDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import userStore from '$lib/userStore';
    import type { User } from 'firebase/auth';

    let title: string = '';
    let content: string = '';
    let error: string | null = null;
    let success: boolean = false;

    let user: User | null = null;
    $: user = $userStore;
  
    async function handleAddPost() {
      try {
        await addDoc(collection(db, 'posts'), {
          title,
          content,
          user: user ? user.email : null,
          timestamp: new Date()
        });
        success = true;
        title = '';
        content = '';
        error = null;
      } catch (e) {
        error = e.message;
      }
    }
  </script>
  
  <div class="form-container">
    <form class="form" on:submit|preventDefault={handleAddPost}>
      <label>
        Title:
        <input type="text" bind:value={title} required />
      </label>
      Content:
      <textarea bind:value={content} required></textarea>
      <button type="submit">Add Post</button>
      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
      {#if success}
        <p style="color: green;">Post added successfully!</p>
      {/if}
    </form>
  </div>
