import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true
        })
    ],

    kit: {
        adapter: adapter({
            fallback: 'index.html'
        }),
        paths: {
            base: process.env.APP_PATH ?? ''
        },
        files: {
            assets: 'src/assets',
            routes: 'src/routes',
            template: 'src/app.html'
        },
        ssr: false,
        prerender: {
            enabled: false
        },
        floc: false,
        target: '#svelte',
        vite: {
            resolve: {
                alias: {
                    tslib: 'tslib/tslib.es6.js',
                    './runtimeConfig': './runtimeConfig.browser'
                }
            },
            build: {
                rollupOptions: {
                    output: {
                        intro: 'if(exports === undefined){var exports ={}; var self = {}}'
                    }
                }
            }
        }
    }
};

export default config;
