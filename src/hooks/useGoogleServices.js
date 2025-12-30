import { useState, useEffect } from 'react';

const CLIENT_ID = '533958879265-u2sipqoup3j5fobgfkq1f37r5g8eo7lj.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/tasks';

export function useGoogleServices(onTasksLoaded) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);

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

            // 2. Find or create todo.txt file in that folder
            const fileId = await findOrCreateFile('todo.txt', folderId);

            // 3. Update file content
            const content = tasks.map(t => t.raw).join('\n');
            await updateFile(fileId, content);

            console.log('✅ Pushed to Google Drive: /todotext.de/todo.txt');
        } catch (err) {
            console.error('❌ Drive Push failed', err);
        } finally {
            setIsSyncing(false);
        }
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

            // 3. Download file content
            const resp = await window.gapi.client.drive.files.get({
                fileId: fileId,
                alt: 'media'
            });

            onTasksLoaded(resp.body);
            console.log('✅ Pulled from Google Drive: /todotext.de/todo.txt');
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

    return {
        isAuthenticated,
        isSyncing,
        login,
        syncPushDrive,
        syncPullDrive,
        syncPushTasks,
        syncPullTasks
    };
}
