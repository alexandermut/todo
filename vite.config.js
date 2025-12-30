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
        '__APP_VERSION__': JSON.stringify(getGitVersion())
    }
}))
