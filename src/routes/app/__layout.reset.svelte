<script context='module' lang='ts'>
    import '../../assets/styles/app.scss';
    import makeServer from '../../mirage/mirage';
    import {authGuard} from '../../app/guards/auth';
    import type {LoadInput, LoadOutput} from '@sveltejs/kit/types';

    if (process.env.NODE_ENV === 'development' && typeof makeServer === 'function') {
        makeServer(); // For people following the tutorial
    }

    export async function load(loadInput: LoadInput): Promise<LoadOutput> {
        return await authGuard(loadInput);
    }
</script>

<slot/>
