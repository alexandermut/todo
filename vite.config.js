import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { execSync } from 'child_process';

const getGitVersion = () => {
    try {
        // Try to get latest commit date in ISO format (or similar that is clean)
        // %cd with --date=format:... let's we customize it.
        // User wants "Zeitpunkt des letzten commits".
        // Format: YYYY-MM-DD-HH-MM-SS as before? Use simple ISO-like default.
        return execSync('git log -1 --format=%cd --date=format:"%Y-%m-%d-%H-%M-%S"').toString().trim();
    } catch (e) {
        return new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-').slice(0, 19);
    }
};

import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
// Vite Configuration - Updated for Theme Refresh
export default defineConfig(({ mode }) => ({
    base: '/', // Root domain for todotext.de
    plugins: [
        react(),
        wasm(),
        topLevelAwait(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'todotext.de',
                short_name: 'todotext.de',
                description: 'A simple, offline-first todo.txt task manager',
                theme_color: '#09090b',
                background_color: '#09090b',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: 'icons/todotext-appicon-dark-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any maskable'
                    },
                    {
                        src: 'icons/todotext-appicon-dark-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
                maximumFileSizeToCacheInBytes: 5000000 // Increase limit for WASM if needed
            },
            devOptions: {
                enabled: true // Enable PWA in dev mode to test
            }
        })
    ],
    define: {
        '__APP_VERSION__': JSON.stringify(getGitVersion())
    }
}))
