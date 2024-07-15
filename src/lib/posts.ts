import { writable } from 'svelte/store';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '$lib/firebase';

export const posts = writable([]);
export let error: string | null = null;

export async function fetchPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    let fetchedPosts = [];
    querySnapshot.forEach((doc) => {
      fetchedPosts.push({ id: doc.id, ...doc.data() });
    });
    fetchedPosts.sort((a, b) => b.timestamp - a.timestamp);
    posts.set(fetchedPosts);
    error = null;
  } catch (e) {
    error = e.message;
  }
}
