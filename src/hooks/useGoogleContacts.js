import { useState, useCallback } from 'react';

export function useGoogleContacts() {
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const searchContacts = useCallback(async (query) => {
        if (!window.gapi || !window.gapi.client || !window.gapi.client.people) {
            console.warn('Google People API not loaded yet');
            return [];
        }

        if (!query || query.length < 2) {
            setSuggestions([]);
            return [];
        }

        setLoading(true);
        try {
            // Use searchContacts for broader search, or connections.list for "My Contacts"
            // connections.list is safer for personal contacts
            const response = await window.gapi.client.people.people.connections.list({
                resourceName: 'people/me',
                pageSize: 10,
                personFields: 'names,phoneNumbers,emailAddresses,photos',
                // sortOrder: 'FIRST_NAME_ASC', // Optional
            });

            const connections = response.result.connections || [];

            // Client-side filtering because connections.list doesn't support "query" parameter 
            // well for partial matches on all fields in the simple version.
            // (searchContacts endpoint is better for "query" but requires other scopes sometimes)
            // Let's try simple client-side filter on top 50-100 contacts or similar? 
            // Actually, let's stick to simple "list all" is too heavy.
            // Let's use people.search if possible.
            // BUT people.search requires 'directory' access which might be restricted.
            // Standard approach for personal address book is fetching all (or caching) or filtering client side.
            // For a todo app, downloading "My Contacts" (names/emails) is okay.

            const lowerQuery = query.toLowerCase();
            const filtered = connections.filter(person => {
                const name = person.names?.[0]?.displayName?.toLowerCase() || '';
                const email = person.emailAddresses?.[0]?.value?.toLowerCase() || '';
                return name.includes(lowerQuery) || email.includes(lowerQuery);
            }).map(person => ({
                id: person.resourceName,
                name: person.names?.[0]?.displayName || 'Unknown',
                email: person.emailAddresses?.[0]?.value,
                phone: person.phoneNumbers?.[0]?.value,
                photo: person.photos?.[0]?.url
            }));

            // If we want REAL search (server side), we use people.searchContacts
            // But connections.list is robust for "My Contacts".

            setSuggestions(filtered);
            return filtered;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // Alternative: Use searchContacts endpoint if available
    const searchContactsApi = useCallback(async (query) => {
        if (!window.gapi || !window.gapi.client || !window.gapi.client.people) return [];

        try {
            const response = await window.gapi.client.people.people.searchContacts({
                query: query,
                readMask: 'names,phoneNumbers,emailAddresses,photos',
            });

            const results = response.result.results || [];
            return results.map(item => {
                const person = item.person;
                return {
                    id: person.resourceName,
                    name: person.names?.[0]?.displayName || 'Unknown',
                    email: person.emailAddresses?.[0]?.value,
                    phone: person.phoneNumbers?.[0]?.value,
                    photo: person.photos?.[0]?.url
                };
            });
        } catch (e) {
            console.log("Search API fallback to list", e);
            // fallback to local filter logic if search not working
            return [];
        }
    }, []);

    return {
        searchContacts: searchContactsApi, // Use the real search API
        loading,
        suggestions
    };
}
