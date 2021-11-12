import {AuthState, authState} from '../state/auth';
import {LoadInput, LoadOutput} from '@sveltejs/kit';
import {base, assets} from '$app/paths';

let auth: AuthState = {loggedIn: false, token: ''};
authState.subscribe(authState => auth = authState);
console.log(base);

export async function authGuard({page}: LoadInput): Promise<LoadOutput> {
    let token = page.query.get('token')
    if (token !== undefined && token !== null && token.length > 32) {
        authState.set({loggedIn: true, token: token})
        return {};
    }
    if (auth.loggedIn && page.path === '/auth/login') {
        console.log(base, '1');
        return {status: 302, redirect: '/'};
    } else if (auth.loggedIn || page.path === '/auth/login') {
        console.log(base, '2');
        return {};
    } else {
        console.log(base, '3');
        return {status: 302, redirect: base + '/auth/login'};
    }
}

export default {
    authGuard
};
