import { useState, useEffect } from 'react';

const CLIENT_ID = '533958879265-u2sipqoup3j5fobgfkq1f37r5g8eo7lj.apps.googleusercontent.com'; // From original file
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

export function useGoogleDrive(onTasksLoaded) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);

    useEffect(() => {
        // Load GAPI and GIS scripts dynamically if not present
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
                // apiKey: API_KEY, // Not strictly needed for user-scoped Drive access if using access token
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
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

    const syncPush = async (tasks) => {
        if (!isAuthenticated) { login(); return; }
        setIsSyncing(true);
        try {
            // 1. Convert tasks to todo.txt string
            const content = tasks.map(t => t.raw).join('\n');

            // 2. Find existing file
            const listResp = await window.gapi.client.drive.files.list({
                q: "name = 'todo.txt' and trashed = false",
                fields: 'files(id, name)',
                spaces: 'drive',
            });

            const files = listResp.result.files;
            const blob = new Blob([content], { type: 'text/plain' });
            const metadata = {
                name: 'todo.txt',
                mimeType: 'text/plain',
            };

            if (files && files.length > 0) {
                // Update existing
                const fileId = files[0].id;
                // Access token is auto-handled by gapi client if GIS set it
                await updateFile(fileId, content);
                console.log('Updated existing todo.txt');
            } else {
                // Create new
                await createFile(metadata, content);
                console.log('Created new todo.txt');
            }
        } catch (err) {
            console.error('Push failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    // Helper for update (gapi client doesn't support multipart upload easily for updates, fetching is easier)
    const updateFile = async (fileId, content) => {
        const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
        const token = window.gapi.client.getToken().access_token;
        await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'text/plain'
            },
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

    const syncPull = async () => {
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
                const fileId = files[0].id;
                const resp = await window.gapi.client.drive.files.get({
                    fileId: fileId,
                    alt: 'media',
                });
                const text = resp.body;
                onTasksLoaded(text);
            }
        } catch (err) {
            console.error('Pull failed', err);
        } finally {
            setIsSyncing(false);
        }
    };

    return { isAuthenticated, isSyncing, login, syncPush, syncPull };
}
