<script lang="ts">
  import { auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '$lib/firebase';
  let email: string = '';
  let password: string = '';
  let error: string | null = null;

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      error = null;
    } catch (e: any) {
      error = e.message;
    }
  }

  function handleGoogleLogin() {
    signInWithPopup(auth, new GoogleAuthProvider());
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <div>
    <label>
      Email:
      <input class="mt-2 w-full border rounded p-2 outline-none focus:shadow-outline" type="email" bind:value={email} required />
    </label>
    <label>
      Password:
      <input class="mt-2 w-full border rounded p-2 outline-none focus:shadow-outline" type="password" bind:value={password} required />
    </label>
  </div>
  {#if error}
    <p class="text-red-500">{error}</p>
  {/if}
  <div class="flex flex-col">
    <button class="mt-2 bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="submit">
      Login
    </button>
    <button class="mt-2 bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded" type="button" on:click={handleGoogleLogin}>
      Login With Google Account
    </button>
  </div>
</form>
