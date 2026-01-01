import { useState, useEffect } from 'react';

const CLIENT_ID = '533958879265-u2sipqoup3j5fobgfkq1f37r5g8eo7lj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks';

export function useGoogleServices(onTasksLoaded) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);
    const [lastRevision, setLastRevision] = useState(null); // Metadata checksum for auto-pull

    useEffect(() => {
        const loadScripts = () => {
            if (!window.gapi) {
                const script = document.createElement('script');
                script.src = 'https://apis.google.com/js/api.js';
                script.onload = () => gapiLoaded();
                document.body.appendChild(script);
            } else {
                gapiLoaded();
            }

            if (!window.google) {
                const script = document.createElement('script');
                script.src = 'https://accounts.google.com/gsi/client';
                script.onload = () => gisLoaded();
                document.body.appendChild(script);
            } else {
                gisLoaded();
            }
        };

        loadScripts();
    }, []);

    const gapiLoaded = () => {
        window.gapi.load('client', async () => {
            await window.gapi.client.init({
                discoveryDocs: [
                    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
                    'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'
                ],
            });
        });
    };

    const gisLoaded = () => {
        const client = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (response) => {
                if (response.error !== undefined) {
                    throw (response);
                }
                setIsAuthenticated(true);
            },
        });
        setTokenClient(client);
    };

    const login = () => {
        if (tokenClient) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        }
    };

    // --- Helper Functions for Visible Folder ---
    const findOrCreateFolder = async (folderName) => {
        try {
            // 1. Search for folder
            const response = await window.gapi.client.drive.files.list({
                q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
                fields: 'files(id, name)',
                spaces: 'drive'
            });

            if (response.result.files && response.result.files.length > 0) {
                console.log(`✅ Found existing folder: ${folderName}`);
                return response.result.files[0].id;
            }

            // 2. Create folder
            const folder = await window.gapi.client.drive.files.create({
                resource: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder'
                },
                fields: 'id'
            });

            console.log(`✅ Created new folder: ${folderName}`);
            return folder.result.id;
        } catch (err) {
            console.error('❌ Folder creation failed', err);
            throw err;
        }
    };

    const findOrCreateFile = async (fileName, folderId) => {
        try {
            // 1. Search for file in folder
            const response = await window.gapi.client.drive.files.list({
                q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
                fields: 'files(id, name)',
                spaces: 'drive'
            });

            if (response.result.files && response.result.files.length > 0) {
                console.log(`✅ Found existing file: ${fileName}`);
                return response.result.files[0].id;
            }

            // 2. Create empty file
            const file = await window.gapi.client.drive.files.create({
                resource: {
                    name: fileName,
                    parents: [folderId],
                    mimeType: 'text/plain'
                },
                fields: 'id'
            });

            console.log(`✅ Created new file: ${fileName}`);
            return file.result.id;
        } catch (err) {
            console.error('❌ File creation failed', err);
            throw err;
        }
    };

    // --- Google Drive Sync ---
    const syncPushDrive = async (tasks) => {
        if (!isAuthenticated) { login(); return; }
        setIsSyncing(true);
        try {
            // 1. Find or create todotext.de folder
            const folderId = await findOrCreateFolder('todotext.de');

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

            // 2. Update todo.txt
            const fileId = await findOrCreateFile('todo.txt', folderId);
            await updateFile(fileId, todoContent);

            // 3. Update done.txt if archiving
            if (shouldArchive) {
                const doneFileId = await findOrCreateFile('done.txt', folderId);
                await updateFile(doneFileId, doneContent);
            }

            console.log('✅ Pushed to Google Drive: /todotext.de/');

            // Trigger Backup
            performDailyBackup();

        } catch (err) {
            console.error('❌ Drive Push failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    const performDailyBackup = async () => {
        const today = new Date().toISOString().split('T')[0];
        const lastBackup = localStorage.getItem('gdrive_last_backup');

        if (lastBackup === today) {
            console.log('✅ Daily backup already performed today (GDrive).');
            return;
        }

        console.log('📦 Starting daily backup (GDrive)...');
        try {
            const rootId = await findOrCreateFolder('todotext.de');

            // 1. Find or Create Archive Folder
            const archiveId = await findOrCreateFolderInParent('Archive', rootId);

            // 2. Backup todo.txt
            const todoId = await findFileId('todo.txt', rootId);
            if (todoId) {
                await copyFile(todoId, archiveId, `${today}_todo.txt`);
            }

            // 3. Backup done.txt
            const doneId = await findFileId('done.txt', rootId);
            if (doneId) {
                await copyFile(doneId, archiveId, `${today}_done.txt`);
            }

            localStorage.setItem('gdrive_last_backup', today);
            console.log('✅ Daily backup completed (GDrive).');

        } catch (err) {
            console.error('GDrive Backup failed', err);
        }
    };

    // Helper to find folder specifically in parent (generic findOrCreateFolder searches globally-ish or doesn't strict parent?)
    // Our existing findOrCreateFolder searches globally by name. 
    // Let's make a specific helper for Archive inside todotext.de to be clean.
    const findOrCreateFolderInParent = async (name, parentId) => {
        try {
            // Search
            const response = await window.gapi.client.drive.files.list({
                q: `name='${name}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
                fields: 'files(id, name)',
                spaces: 'drive'
            });
            if (response.result.files?.length > 0) return response.result.files[0].id;

            // Create
            const folder = await window.gapi.client.drive.files.create({
                resource: {
                    name: name,
                    parents: [parentId],
                    mimeType: 'application/vnd.google-apps.folder'
                },
                fields: 'id'
            });
            return folder.result.id;
        } catch (e) { console.error('Archive folder error', e); throw e; }
    };

    const findFileId = async (name, parentId) => {
        const response = await window.gapi.client.drive.files.list({
            q: `name='${name}' and '${parentId}' in parents and trashed=false`,
            fields: 'files(id)',
            spaces: 'drive'
        });
        return response.result.files?.[0]?.id;
    };

    const copyFile = async (fileId, parentId, newName) => {
        await window.gapi.client.drive.files.copy({
            fileId: fileId,
            resource: {
                name: newName,
                parents: [parentId]
            }
        });
    };

    const updateFile = async (fileId, content) => {
        const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
        const token = window.gapi.client.getToken().access_token;
        await fetch(url, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
            body: content
        });
    };

    const createFile = async (metadata, content) => {
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', new Blob([content], { type: 'text/plain' }));
        const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
        const token = window.gapi.client.getToken().access_token;
        await fetch(url, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: form
        });
    };

    const syncPullDrive = async () => {
        if (!isAuthenticated) { login(); return; }
        setIsSyncing(true);
        try {
            // 1. Find or create todotext.de folder
            const folderId = await findOrCreateFolder('todotext.de');

            // 2. Find or create todo.txt file in that folder
            const fileId = await findOrCreateFile('todo.txt', folderId);

            // 3. Download todo.txt content
            const resp = await window.gapi.client.drive.files.get({
                fileId: fileId,
                alt: 'media'
            });

            // Fetch metadata for checksum
            const metaResp = await window.gapi.client.drive.files.get({
                fileId: fileId,
                fields: 'md5Checksum'
            });
            if (metaResp.result.md5Checksum) {
                setLastRevision(metaResp.result.md5Checksum);
            }

            let fullText = resp.body;

            // 4. Try to load done.txt (optional)
            try {
                const doneFileId = await findOrCreateFile('done.txt', folderId); // This creates if missing, maybe findFileId is better? 
                // findOrCreate is fine, if we create empty done.txt it returns empty body usually or we check size.
                // Actually findOrCreate returns ID.
                const doneResp = await window.gapi.client.drive.files.get({
                    fileId: doneFileId,
                    alt: 'media'
                });
                if (doneResp.body) {
                    fullText += '\n' + doneResp.body;
                    console.log('✅ Loaded done.txt from Drive');
                }
            } catch (e) {
                console.warn('⚠️ Could not load done.txt (might be empty/new)', e);
            }

            onTasksLoaded(fullText);
            console.log('✅ Pulled from Google Drive: /todotext.de/');
        } catch (err) {
            console.error('❌ Drive Pull failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    // --- Google Tasks Sync (Basic Implementation) ---
    const syncPushTasks = async (tasks) => {
        if (!isAuthenticated) { login(); return; }
        setIsSyncing(true);
        try {
            const lists = await window.gapi.client.tasks.tasklists.list();
            const defaultList = lists.result.items[0];

            for (const task of tasks) {
                if (task.completed) continue;

                await window.gapi.client.tasks.tasks.insert({
                    tasklist: defaultList.id,
                    resource: {
                        title: task.text,
                        notes: task.raw
                    }
                });
            }
            console.log('Pushed tasks to Google Tasks');

        } catch (err) {
            console.error('GTasks Push failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    const syncPullTasks = async () => {
        if (!isAuthenticated) { login(); return; }
        setIsSyncing(true);
        try {
            const lists = await window.gapi.client.tasks.tasklists.list();
            const defaultList = lists.result.items[0];

            const response = await window.gapi.client.tasks.tasks.list({
                tasklist: defaultList.id,
                showCompleted: true,
                showHidden: true
            });

            const gTasks = response.result.items || [];

            // Convert Google Tasks to todo.txt format
            const todoLines = gTasks.map(task => {
                const completed = task.status === 'completed' ? 'x ' : '';
                const title = task.title || '';
                const notes = task.notes ? ` ${task.notes}` : '';
                return `${completed}${title}${notes}`;
            }).filter(line => line.trim());

            const todoText = todoLines.join('\n');
            onTasksLoaded(todoText);
            console.log('✅ Pulled tasks from Google Tasks');

        } catch (err) {
            console.error('❌ GTasks Pull failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    const checkForRemoteUpdates = async () => {
        if (!isAuthenticated || !lastRevision || isSyncing) return;
        try {
            const folderId = await findOrCreateFolder('todotext.de');
            const fileId = await findFileId('todo.txt', folderId);
            if (fileId) {
                const metaResp = await window.gapi.client.drive.files.get({
                    fileId: fileId,
                    fields: 'md5Checksum'
                });
                const remoteMd5 = metaResp.result.md5Checksum;

                if (remoteMd5 && remoteMd5 !== lastRevision) {
                    console.log('🔄 Remote change detected (MD5 mismatch). Pulling (GDrive)...');
                    await syncPullDrive();
                }
            }
        } catch (e) {
            console.error('Remote check failed (GDrive)', e);
        }
    };

    return {
        isAuthenticated,
        isSyncing,
        login,
        syncPushDrive,
        syncPullDrive,
        syncPushTasks,
        syncPullTasks,
        checkForRemoteUpdates // Exported
    };
}
