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

    // --- Google Drive Sync ---
    const syncPushDrive = async (tasks) => {
        if (!isAuthenticated) { login(); return; }
        setIsSyncing(true);
        try {
            const content = tasks.map(t => t.raw).join('\n');
            const listResp = await window.gapi.client.drive.files.list({
                q: "name = 'todo.txt' and trashed = false",
                fields: 'files(id, name)',
                spaces: 'drive',
            });

            const files = listResp.result.files;
            const metadata = { name: 'todo.txt', mimeType: 'text/plain' };

            if (files && files.length > 0) {
                await updateFile(files[0].id, content);
                console.log('Updated existing todo.txt');
            } else {
                await createFile(metadata, content);
                console.log('Created new todo.txt');
            }
        } catch (err) {
            console.error('Drive Push failed', err);
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
            const listResp = await window.gapi.client.drive.files.list({
                q: "name = 'todo.txt' and trashed = false",
                fields: 'files(id, name)',
                spaces: 'drive',
            });
            const files = listResp.result.files;
            if (files && files.length > 0) {
                const resp = await window.gapi.client.drive.files.get({ fileId: files[0].id, alt: 'media' });
                onTasksLoaded(resp.body);
            }
        } catch (err) {
            console.error('Drive Pull failed', err);
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

    return {
        isAuthenticated,
        isSyncing,
        login,
        syncPushDrive,
        syncPullDrive,
        syncPushTasks
    };
}
