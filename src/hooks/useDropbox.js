import { useState, useEffect } from 'react';

// Placeholder App Key - User must replace this
const DROPBOX_APP_KEY = 'rbpbfwt1ba6ji8h';

export function useDropbox(onTasksLoaded, shouldArchive = false) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState(null);
    const [fileRev, setFileRev] = useState(null);
    const [doneRev, setDoneRev] = useState(null); // Added doneRev tracking

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
            let todoContent = '';
            let doneContent = '';

            if (shouldArchive) {
                const active = tasks.filter(t => !t.completed);
                const done = tasks.filter(t => t.completed);
                todoContent = active.map(t => t.raw).join('\n');
                doneContent = done.map(t => t.raw).join('\n');
            } else {
                todoContent = tasks.map(t => t.raw).join('\n');
            }

            // SAFETY CHECK: If we have no Rev (first sync), check if file exists remotely
            // to avoid overwriting existing data with potentially empty local state.
            if (!fileRev) {
                try {
                    const metaResponse = await fetch('https://api.dropboxapi.com/2/files/get_metadata', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ path: '/todo.txt' })
                    });

                    if (metaResponse.ok) {
                        const meta = await metaResponse.json();
                        setFileRev(meta.rev);
                        // File exists! Do not overwrite. Treat as conflict/merge.
                        console.warn('⚠️ Remote file found during initial push. Switching to Merge flow.');
                        await handleConflict(tasks);
                        return;
                    }
                } catch (e) {
                    // Ignore error (file likely doesn't exist), proceed to upload
                }
            }

            const todoFile = new Blob([todoContent], { type: 'text/plain' });

            // Optimistic Concurrency
            const mode = fileRev ? { '.tag': 'update', 'update': fileRev } : { '.tag': 'overwrite' };

            // 1. Upload todo.txt
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
                body: todoFile
            });

            if (response.status === 401) {
                console.error('Dropbox Token Expired (401)');
                setIsAuthenticated(false);
                sessionStorage.removeItem('dropbox_token');
                return;
            }

            if (response.status === 409) {
                console.warn('⚠️ Conflict detected on todo.txt (409). Server file is newer. Merging changes...');
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
                console.log('Dropbox push successful (todo.txt). New Rev:', data.rev);
                setLastSyncTime(new Date());

                // 2. Upload done.txt (if archiving)
                if (shouldArchive) {
                    await uploadDoneTxt(doneContent);
                }

                // Trigger daily backup check
                performDailyBackup();
            } else {
                console.error('Dropbox push error:', response.status, await response.text());
            }
        } catch (err) {
            console.error('Dropbox push network error', err);
        } finally {
            setIsSyncing(false);
        }
    };

    const uploadDoneTxt = async (content) => {
        const file = new Blob([content], { type: 'text/plain' });
        const mode = doneRev ? { '.tag': 'update', 'update': doneRev } : { '.tag': 'overwrite' };

        try {
            const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: '/done.txt',
                        mode: mode,
                        autorename: true,
                        mute: false
                    }),
                    'Content-Type': 'application/octet-stream'
                },
                body: file
            });

            if (response.ok) {
                const data = await response.json();
                setDoneRev(data.rev);
                console.log('Dropbox push successful (done.txt). New Rev:', data.rev);
            } else if (response.status === 409) {
                console.warn('⚠️ Conflict on done.txt. Skipping update to avoid overwrite (TODO: Merge done.txt).');
            }
        } catch (e) {
            console.error('Failed to upload done.txt', e);
        }
    };

    const checkForRemoteUpdates = async () => {
        if (!accessToken || !fileRev || isSyncing) return;

        try {
            const response = await fetch('https://api.dropboxapi.com/2/files/get_metadata', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: '/todo.txt'
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.rev !== fileRev) {
                    console.log('🔄 Remote change detected (Rev mismatch). Pulling...');
                    await syncPull();
                }
            }
        } catch (e) {
            console.error('Remote check failed', e);
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

    const cleanupConflicts = async () => {
        try {
            const today = new Date().toISOString().split('T')[0];

            // 1. List files in root
            const response = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    path: '', // Root
                    recursive: false
                })
            });

            if (response.ok) {
                const data = await response.json();
                const files = data.entries;

                // 2. Filter for "conflicted copy"
                const conflicts = files.filter(f =>
                    f['.tag'] === 'file' &&
                    f.name.toLowerCase().includes('conflicted copy')
                );

                if (conflicts.length > 0) {
                    console.log(`🧹 Found ${conflicts.length} conflicted copies. Moving to /Archive/conflicts/...`);

                    for (const file of conflicts) {
                        try {
                            await fetch('https://api.dropboxapi.com/2/files/move_v2', {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    from_path: file.path_lower,
                                    to_path: `/Archive/conflicts/${today}_${file.name}`,
                                    autorename: true
                                })
                            });
                            console.log(`✅ Moved ${file.name} to /Archive/conflicts/${today}_${file.name}`);
                        } catch (moveErr) {
                            console.error(`Failed to move ${file.name}`, moveErr);
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Conflict cleanup failed', e);
        }
    };

    const performDailyBackup = async () => {
        const today = new Date().toISOString().split('T')[0];
        const lastBackup = localStorage.getItem('dropbox_last_backup');

        if (lastBackup === today) {
            console.log('✅ Daily backup already performed today.');
            // Still check for conflicts? Maybe not on every single sync if backup done.
            // But user might want it. Let's keep it commented out for rescue.
            // await cleanupConflicts(); 
            return;
        }

        console.log('📦 Starting daily backup...');

        try {
            // Check/Create Archive Folder (implicitly handled by copy if path exists, but safer to check? 
            // Dropbox copy_v2 creates parent folders if missing usually? Actually, let's just copy to /Archive/...)

            const timestamp = today;
            const filesToBackup = ['todo.txt', 'done.txt'];

            for (const filename of filesToBackup) {
                try {
                    await fetch('https://api.dropboxapi.com/2/files/copy_v2', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            from_path: `/${filename}`,
                            to_path: `/Archive/${timestamp}_${filename}`,
                            autorename: false
                        })
                    });
                    console.log(`✅ Backed up ${filename} to /Archive/${timestamp}_${filename}`);
                } catch (e) {
                    // Ignore if file doesn't exist or backup already exists
                    console.warn(`Backup skipped for ${filename} (may not exist or already backed up)`);
                }
            }

            localStorage.setItem('dropbox_last_backup', today);

            // Allow checking for conflicts every time we backup or sync
            try {
                await cleanupConflicts();
            } catch (err) {
                console.error("Cleanup failed", err);
            }

        } catch (err) {
            console.error('Backup failed', err);
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

                // Trigger backup check after successful push
                performDailyBackup();
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

                if (doneResponse.status === 401) return;

                if (doneResponse.ok) {
                    const meta = JSON.parse(doneResponse.headers.get('dropbox-api-result'));
                    setDoneRev(meta.rev);
                    doneText = await doneResponse.text();
                    console.log('✅ done.txt loaded. Rev:', meta.rev);
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
