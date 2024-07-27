<script lang="ts">
    import { collection, addDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase';
    import userStore from '$lib/userStore';
    import type { User } from 'firebase/auth';
    import { fetchPosts } from '$lib/posts';

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
        fetchPosts();
      } catch (e) {
        error = e.message;
      } finally {
        setTimeout(() => {
          success = false;
        }, 1500);
      }
    }
  </script>
  
  <div class="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-md md:mx-auto">
    <form class="" on:submit|preventDefault={handleAddPost}>
      <label>
        Title:
        <input class="w-full border rounded p-2 outline-none focus:shadow-outline" type="text" bind:value={title} required />
      </label>
      <label class="mt-2">
        Content:
        <textarea
          bind:value={content}
          required
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        />
      </label>
      <button
        class="mt-2 bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
        type="submit"
      >
        Add Post
      </button>
      {#if error}
        <p class="text-red-500">{error}</p>
      {/if}
      {#if success}
        <p class="text-green-500">Post added successfully!</p>
      {/if}
    </form>
  </div>
