import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [Vue(),
    ],
    test: {
        globals: true,
        environment: "happy-dom",
        include: ['__tests__/**/*.spec.ts'],
    },
    resolve: {
        alias: {
            '@': '/',
            '~': '/'
        }
    }
})