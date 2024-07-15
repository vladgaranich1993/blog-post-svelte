import { writable } from 'svelte/store';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '$lib/firebase';

export const posts = writable([]);
export let error: string | null = null;

export async function fetchPosts() {
  try {
    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(postsQuery);
    let fetchedPosts: any[] = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push({ id: doc.id, ...doc.data() });
    });
    posts.set(fetchedPosts);
    error = null;
  } catch (e) {
    error = e.message;
  }
}
