import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
// Vite Configuration - Updated for Theme Refresh
export default defineConfig(({ mode }) => ({
    base: '/', // Root domain for todotext.de
    plugins: [
        react(),
        wasm(),
        topLevelAwait()
    ],
    define: {
        '__APP_VERSION__': JSON.stringify(new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-').slice(0, 19))
    }
}))
