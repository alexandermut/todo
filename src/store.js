import { parse_todo_line } from './parser.js';
import { get, set } from 'idb-keyval';

export const Store = {
    tasks: [],
    listeners: [],
    undoStack: [],
    // maxUndoSize: 20, // Removed as per instruction

    init() {
        this.loadFromPersistence();
    },

    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.unsubscribe(listener);
    },

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    },

    notify() {
        this.listeners.forEach(fn => fn(this.tasks));
    },

    loadFromString(text) {
        const lines = text.split('\n');
        this.tasks = [];
        lines.forEach(line => {
            // Ensure line is not empty
            if (!line.trim()) return;
            const task = parse_todo_line(line);
            if (task) {
                // WASM parser might return object even if text empty? Check text.
                // Actually WASM returns Struct.
                this.tasks.push(task);
            }
        });
        this.saveToPersistence(); // Kept this line as it was in the original and makes sense with loadFromPersistence
        this.notify();
    },


    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('todoTxtTasks');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) this.tasks = parsed;
            }
        } catch (e) { console.error('Failed to load tasks:', e); }
    },

    saveToLocalStorage() {
        try { localStorage.setItem('todoTxtTasks', JSON.stringify(this.tasks)); }
        catch (e) { console.error('Failed to save tasks:', e); }
    },

    // New methods for persistence
    loadFromPersistence() {
        this.loadFromLocalStorage();
    },

    saveToPersistence() {
        this.saveToLocalStorage();
    },

    saveUndoState() {
        this.undoStack.push(JSON.parse(JSON.stringify(this.tasks)));
        // if (this.undoStack.length > this.maxUndoSize) this.undoStack.shift(); // maxUndoSize removed, so this line is commented out
    },

    undo() {
        if (this.undoStack.length === 0) return;
        this.tasks = this.undoStack.pop();
        this.saveToPersistence();
        this.notify();
    },

    addTask(rawText) {
        const task = parse_todo_line(rawText);
        if (!task || !task.text.trim()) return;

        this.saveUndoState();
        this.tasks.push(task);
        this.saveToPersistence();
        this.notify();
    },

    updateTask(id, newRaw) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            this.saveUndoState();
            const updatedTask = parse_todo_line(newRaw);
            updatedTask.id = id;
            // Preserve creation date if not present in new raw text but present in old task
            if (this.tasks[index].creationDate && !updatedTask.creationDate) {
                updatedTask.creationDate = this.tasks[index].creationDate;
            }
            this.tasks[index] = updatedTask;
            this.saveToPersistence();
            this.notify();
        }
    },

    deleteTask(id) {
        this.saveUndoState();
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToPersistence();
        this.notify();
    },

    clearAllTasks() {
        this.saveUndoState();
        this.tasks = [];
        this.saveToPersistence();
        this.notify();
    },

    setTaskPriority(id, priority) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) return;

        const task = this.tasks[index];
        this.saveUndoState();

        let newRaw = task.raw;
        // Remove existing priority (A-Z)
        newRaw = newRaw.replace(/^\([A-Z]\)\s/, "");

        if (priority) {
            newRaw = `(${priority}) ${newRaw}`;
        }

        // Update task with new raw string (re-parse to be safe)
        const updatedTask = parse_todo_line(newRaw);
        if (updatedTask) {
            updatedTask.id = id;
            if (task.creationDate && !updatedTask.creationDate) {
                updatedTask.creationDate = task.creationDate;
            }
            if (task.completionDate && !updatedTask.completionDate) {
                updatedTask.completionDate = task.completionDate;
            }
            updatedTask.completed = task.completed; // Preserve status just in case

            this.tasks[index] = updatedTask;
            this.saveToPersistence();
            this.notify();
        }
    },

    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        this.saveUndoState();
        task.completed = !task.completed;
        const today = (new Date).toISOString().split("T")[0];

        let newRaw = task.raw;
        // Remove existing x YYYY-MM-DD if present
        newRaw = newRaw.replace(/^x\s\d{4}-\d{2}-\d{2}\s/, "").trim();

        if (task.completed) {
            task.completionDate = today;
            newRaw = `x ${today} ${newRaw}`;
        } else {
            task.completionDate = null;
        }
        task.raw = newRaw;

        this.saveToLocalStorage();
        this.notify();
    },

    deleteTask(taskId) {
        this.saveUndoState();
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveToLocalStorage();
        this.notify();
    },

    // Simplified getter for now
    getTasks() {
        return this.tasks;
    }
};
