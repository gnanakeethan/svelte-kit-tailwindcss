import { writable } from 'svelte-local-storage-store';

export interface Preferences {
	theme: string;
}

export const preferences = writable('preferences', {
	theme: 'dark'
} as Preferences);
