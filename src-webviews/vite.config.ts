import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',

    resolve: {
        alias: {
            '@View': resolve(__dirname, './src/'),
            '@Shared': resolve(__dirname, '../src/core/shared'),
        },
    },

    plugins: [svelte({})],

    build: {
        outDir: '../resources/webviews',
        emptyOutDir: true,
        minify: 'esbuild',
        reportCompressedSize: false,
        rollupOptions: {
            external: ['alt-client'],
        },
    },
});
