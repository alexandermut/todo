/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                todoist: {
                    limit: '#ea580c', // Orange-600
                    brand: '#334155', // Slate-700 (Marine/Navy) - Renamed from primary to bust cache
                    brandHover: '#1e293b', // Slate-800
                    sidebar: '#f8fafc', // Slate-50
                    hover: '#e2e8f0', // Slate-200
                    text: '#0f172a', // Slate-900
                    textSec: '#64748b' // Slate-500
                }
            }
        },
    },
    plugins: [],
}
