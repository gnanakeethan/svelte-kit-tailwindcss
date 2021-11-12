import { persist, PersistentStore, localStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export interface AuthState {
	loggedIn: boolean;
	token: string;
}

export const authState: PersistentStore<AuthState> = persist(writable({
	loggedIn: false,
	token   : ''
} as AuthState), localStorage(), 'authState');
