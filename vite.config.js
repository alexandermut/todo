import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
// Vite Configuration - Updated for Theme Refresh
export default defineConfig(({ mode }) => ({
    base: mode === 'production' ? '/todo/' : '/',
    plugins: [
        react(),
        wasm(),
        topLevelAwait()
    ],
}))
