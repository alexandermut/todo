import { useState, useEffect } from 'react';

// Placeholder App Key - User must replace this
const DROPBOX_APP_KEY = 'xdqurve95t2h4hb';

export function useDropbox(onTasksLoaded) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        // Check for token in URL hash (Implicit Flow)
        const hash = window.location.hash;
        if (hash.includes('access_token')) {
            const params = new URLSearchParams(hash.substring(1));
            const token = params.get('access_token');
            if (token) {
                setAccessToken(token);
                setIsAuthenticated(true);
                // Clear hash to clean URL
                window.history.replaceState(null, null, window.location.pathname);
                // Ideally save token to localStorage/sessionStorage for persistence
                sessionStorage.setItem('dropbox_token', token);
            }
        } else {
            const saved = sessionStorage.getItem('dropbox_token');
            if (saved) {
                setAccessToken(saved);
                setIsAuthenticated(true);
            }
        }
    }, []);

    const login = () => {
        const redirectUri = window.location.origin;
        const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${DROPBOX_APP_KEY}&response_type=token&redirect_uri=${redirectUri}`;
        window.location.href = authUrl;
    };

    const syncPush = async (tasks) => {
        if (!accessToken) { login(); return; }
        setIsSyncing(true);
        try {
            const content = tasks.map(t => t.raw).join('\n');
            const file = new Blob([content], { type: 'text/plain' });

            await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: '/todo.txt',
                        mode: 'overwrite',
                        autorename: true,
                        mute: false
                    }),
                    'Content-Type': 'application/octet-stream' // Dropbox requires this
                },
                body: file
            });
            console.log('Dropbox push successful');
        } catch (err) {
            console.error('Dropbox push failed', err);
            if (err.status === 401) {
                setIsAuthenticated(false);
                sessionStorage.removeItem('dropbox_token');
            }
        } finally {
            setIsSyncing(false);
        }
    };

    const syncPull = async () => {
        if (!accessToken) { login(); return; }
        setIsSyncing(true);
        try {
            // Fetch todo.txt
            const todoResponse = await fetch('https://content.dropboxapi.com/2/files/download', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: '/todo.txt'
                    })
                }
            });

            let todoText = '';
            if (todoResponse.ok) {
                todoText = await todoResponse.text();
                console.log('✅ todo.txt loaded');
            } else {
                console.warn('⚠️ todo.txt not found or error:', todoResponse.status);
            }

            // Fetch done.txt (optional)
            let doneText = '';
            try {
                const doneResponse = await fetch('https://content.dropboxapi.com/2/files/download', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Dropbox-API-Arg': JSON.stringify({
                            path: '/done.txt'
                        })
                    }
                });

                if (doneResponse.ok) {
                    doneText = await doneResponse.text();
                    console.log('✅ done.txt loaded');
                } else {
                    console.log('ℹ️ done.txt not found (optional)');
                }
            } catch (err) {
                console.log('ℹ️ done.txt not available (optional)');
            }

            // Combine both files
            const combinedText = [todoText, doneText].filter(t => t.trim()).join('\n');
            if (combinedText) {
                onTasksLoaded(combinedText);
                console.log('✅ Dropbox pull successful (todo.txt + done.txt)');
            } else {
                console.warn('⚠️ No tasks found in Dropbox files');
            }
        } catch (err) {
            console.error('❌ Dropbox pull failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    return { isAuthenticated, isSyncing, login, syncPush, syncPull };
}
