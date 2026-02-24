const NOTE_PREFIX = 'todotext_note_';

export const NoteService = {
    /**
     * Speichert eine Notiz. Derzeit lokal, später erweiterbar für Sync.
     */
    saveNote: (noteName, content) => {
        try {
            localStorage.setItem(`${NOTE_PREFIX}${noteName}`, content);
            return true;
        } catch (e) {
            console.error('Error saving note', e);
            return false;
        }
    },

    /**
     * Lädt eine Notiz. Gibt null zurück, wenn sie nicht existiert.
     */
    getNote: (noteName) => {
        try {
            return localStorage.getItem(`${NOTE_PREFIX}${noteName}`);
        } catch (e) {
            console.error('Error loading note', e);
            return null;
        }
    },

    /**
     * Löscht eine Notiz.
     */
    deleteNote: (noteName) => {
        try {
            localStorage.removeItem(`${NOTE_PREFIX}${noteName}`);
            return true;
        } catch (e) {
            console.error('Error deleting note', e);
            return false;
        }
    },

    /**
     * Gibt alle gespeicherten Notizennamen und Inhalte zurück.
     * Nützlich für den Export.
     */
    getAllNotes: () => {
        const notes = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(NOTE_PREFIX)) {
                const noteName = key.substring(NOTE_PREFIX.length);
                notes[noteName] = localStorage.getItem(key);
            }
        }
        return notes;
    }
};
