import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from './firebase';

const user = writable<User | null>(null);

onAuthStateChanged(auth, (u) => {
  user.set(u);
});

export default user;
