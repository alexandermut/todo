import { useState, useEffect } from 'react';

// Placeholder App Key - User must replace this
const DROPBOX_APP_KEY = 'rbpbfwt1ba6ji8h';

export function useDropbox(onTasksLoaded) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState(null);
    const [fileRev, setFileRev] = useState(null);

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

    const syncPush = async (tasks, retry = true) => {
        if (!accessToken) { login(); return; }
        setIsSyncing(true);
        try {
            const content = tasks.map(t => t.raw).join('\n');
            const file = new Blob([content], { type: 'text/plain' });

            // Optimistic Concurrency: Only overwrite if rev matches (if we have one)
            const mode = fileRev ? { '.tag': 'update', 'update': fileRev } : { '.tag': 'overwrite' };

            const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: '/todo.txt',
                        mode: mode,
                        autorename: true,
                        mute: false
                    }),
                    'Content-Type': 'application/octet-stream'
                },
                body: file
            });

            if (response.status === 401) {
                console.error('Dropbox Token Expired (401)');
                setIsAuthenticated(false);
                sessionStorage.removeItem('dropbox_token');
                return;
            }

            if (response.status === 409) {
                console.warn('⚠️ Conflict detected (409). Server file is newer. Merging changes...');
                if (retry) {
                    await handleConflict(tasks);
                } else {
                    console.error('❌ Conflict resolution failed.');
                }
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setFileRev(data.rev);
                console.log('Dropbox push successful. New Rev:', data.rev);
                setLastSyncTime(new Date());
            } else {
                console.error('Dropbox push error:', response.status, await response.text());
            }
        } catch (err) {
            console.error('Dropbox push network error', err);
        } finally {
            setIsSyncing(false);
        }
    };

    const handleConflict = async (localTasks) => {
        try {
            // 1. Download Remote Content
            const response = await fetch('https://content.dropboxapi.com/2/files/download', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({ path: '/todo.txt' })
                }
            });

            if (response.ok) {
                // Update Rev from conflict download
                const meta = JSON.parse(response.headers.get('dropbox-api-result'));
                const newRev = meta.rev;

                const remoteText = await response.text();
                const remoteLines = remoteText.split('\n').filter(l => l.trim());
                const localLines = localTasks.map(t => t.raw);

                // 2. Client-Side 3-Way Merge (Simulated via Union for TODO.txt)
                // "Safe Merge": Union of all unique valid lines.
                // This ensures we keep remote additions AND local additions.
                // Re-ordered lines might be an issue but todo.txt is order-tolerant usually.
                const mergedSet = new Set([...remoteLines, ...localLines]);
                const mergedText = Array.from(mergedSet).join('\n');

                console.log(`Merged ${localLines.length} local + ${remoteLines.length} remote tasks -> ${mergedSet.size} unique tasks.`);

                // 3. Update Local State (so UI reflects merged state)
                onTasksLoaded(mergedText);

                // 4. Retry Push with Merged Content
                await directUploadText(mergedText, newRev);
            }
        } catch (e) {
            console.error("Conflict handling logic failed", e);
        }
    };

    const directUploadText = async (text, rev) => {
        const file = new Blob([text], { type: 'text/plain' });
        try {
            const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: '/todo.txt',
                        mode: { '.tag': 'update', 'update': rev },
                        autorename: true,
                        mute: false
                    }),
                    'Content-Type': 'application/octet-stream'
                },
                body: file
            });
            if (response.ok) {
                const data = await response.json();
                setFileRev(data.rev);
                setLastSyncTime(new Date());
                console.log('Merge & Push successful. Rev:', data.rev);
            }
        } catch (e) {
            console.error('Direct upload failed', e);
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

            if (todoResponse.status === 401) {
                console.error('Dropbox Token Expired (401) during Pull');
                setIsAuthenticated(false);
                sessionStorage.removeItem('dropbox_token');
                return;
            }

            let todoText = '';
            if (todoResponse.ok) {
                const meta = JSON.parse(todoResponse.headers.get('dropbox-api-result'));
                setFileRev(meta.rev);
                todoText = await todoResponse.text();
                console.log('✅ todo.txt loaded. Rev:', meta.rev);
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

                if (doneResponse.status === 401) return; // Already handled above mostly, but good safety

                if (doneResponse.ok) {
                    doneText = await doneResponse.text();
                    console.log('✅ done.txt loaded');
                }
            } catch (err) {
                console.log('ℹ️ done.txt not available (optional)');
            }

            // Combine both files
            const combinedText = [todoText, doneText].filter(t => t.trim()).join('\n');
            if (combinedText) {
                onTasksLoaded(combinedText);
                console.log('✅ Dropbox pull successful');
            }
        } catch (err) {
            console.error('❌ Dropbox pull failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    return { isAuthenticated, isSyncing, login, syncPush, syncPull, lastSyncTime };
}
