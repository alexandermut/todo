// Tauri bridge: native file I/O that replaces localStorage for persistence

let tauriInvoke = null;

try {
    // Dynamic import so the web build doesn't break
    const tauri = await import('@tauri-apps/api/core');
    tauriInvoke = tauri.invoke;
} catch {
    // Not running in Tauri — fall back to localStorage
    tauriInvoke = null;
}

export const isTauri = () => tauriInvoke !== null;

export async function loadTasksNative() {
    if (!tauriInvoke) return null;
    try {
        const content = await tauriInvoke('load_tasks');
        return content;
    } catch (e) {
        console.error('Tauri load_tasks failed:', e);
        return null;
    }
}

export async function saveTasksNative(content) {
    if (!tauriInvoke) return;
    try {
        await tauriInvoke('save_tasks', { content });
    } catch (e) {
        console.error('Tauri save_tasks failed:', e);
    }
}
