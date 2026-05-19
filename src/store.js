import { parse_todo_line } from 'todo-parser';
import { loadTasksNative, saveTasksNative, isTauri } from './tauri-bridge';

// Debounce timer for native saves
let _nativeSaveTimer = null;
const NATIVE_SAVE_DEBOUNCE = 300;

const saveNativeDebounced = (content) => {
    clearTimeout(_nativeSaveTimer);
    _nativeSaveTimer = setTimeout(() => {
        saveTasksNative(content);
    }, NATIVE_SAVE_DEBOUNCE);
};

export const Store = {
    tasks: [],
    listeners: [],
    undoStack: [],
    redoStack: [],
    _useNative: null, // cached check

    async init() {
        await this.loadFromPersistence();
    },

    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.unsubscribe(listener);
    },

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    },

    notify(source = 'STORE') {
        this.listeners.forEach(fn => fn(this.tasks, source));
    },

    loadFromString(text) {
        const lines = text.split('\n');
        this.tasks = [];
        lines.forEach(line => {
            if (!line.trim()) return;
            const task = parse_todo_line(line);
            if (task) {
                this.tasks.push(task);
            }
        });
        this.saveToPersistence();
        this.notify('CLOUD');
    },


    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('todoTxtTasks');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) this.tasks = parsed;
                this.notify('LOCAL_STORAGE');
            }
        } catch (e) { console.error('Failed to load tasks:', e); }
    },

    saveToLocalStorage() {
        try { localStorage.setItem('todoTxtTasks', JSON.stringify(this.tasks)); }
        catch (e) { console.error('Failed to save tasks:', e); }
    },

    // Updated persistence: native file I/O in Tauri, localStorage fallback
    async loadFromPersistence() {
        if (isTauri()) {
            try {
                const content = await loadTasksNative();
                if (content && content.trim()) {
                    const lines = content.split('\n');
                    this.tasks = [];
                    lines.forEach(line => {
                        if (!line.trim()) return;
                        const task = parse_todo_line(line);
                        if (task) this.tasks.push(task);
                    });
                    this.notify('TAURI_LOAD');
                    // Also save to localStorage as fallback
                    this.saveToLocalStorage();
                    return;
                }
            } catch (e) {
                console.error('Tauri load failed, falling back to localStorage:', e);
            }
        }
        // Fallback: localStorage
        this.loadFromLocalStorage();
    },

    saveToPersistence() {
        this.lastModificationTime = Date.now();

        // Always save to localStorage (fast, synchronous)
        this.saveToLocalStorage();

        // In Tauri: also persist to native file (debounced)
        if (isTauri()) {
            const todoTxtContent = this.tasks
                .map(t => t.raw)
                .filter(r => r && r.trim())
                .join('\n');
            saveNativeDebounced(todoTxtContent);
        }
    },

    lastModificationTime: Date.now(),

    saveUndoState() {
        // Limit stack size if needed (e.g. 50)
        if (this.undoStack.length > 50) this.undoStack.shift();

        this.undoStack.push(JSON.parse(JSON.stringify(this.tasks)));
        this.redoStack = []; // Clear redo stack on new action
    },

    undo() {
        if (this.undoStack.length === 0) return;

        // Push current to Redo
        this.redoStack.push(JSON.parse(JSON.stringify(this.tasks)));

        // Pop from Undo
        this.tasks = this.undoStack.pop();

        this.saveToPersistence();
        this.notify('UNDO');
    },

    redo() {
        if (this.redoStack.length === 0) return;

        // Push current to Undo
        this.undoStack.push(JSON.parse(JSON.stringify(this.tasks)));

        // Pop from Redo
        this.tasks = this.redoStack.pop();

        this.saveToPersistence();
        this.notify('REDO');
    },

    getCanUndo() { return this.undoStack.length > 0; },
    getCanRedo() { return this.redoStack.length > 0; },

    addTask(rawText) {
        const task = parse_todo_line(rawText);
        if (!task || !task.text.trim()) return;

        this.saveUndoState();
        this.tasks.push(task);
        this.saveToPersistence();
        this.notify('ADD_TASK');
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
            this.notify('UPDATE_TASK');
        }
    },

    updateTasks(updates) {
        if (!updates || updates.length === 0) return;
        this.saveUndoState();

        updates.forEach(({ id, newRaw }) => {
            const index = this.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                const updatedTask = parse_todo_line(newRaw);
                updatedTask.id = id;
                if (this.tasks[index].creationDate && !updatedTask.creationDate) {
                    updatedTask.creationDate = this.tasks[index].creationDate;
                }
                this.tasks[index] = updatedTask;
            }
        });

        this.saveToPersistence();
        this.notify('UPDATE_TASKS');
    },

    replaceAllTasks(newTasks, shouldNotify = true) {
        this.tasks = newTasks;
        this.saveToPersistence();
        if (shouldNotify) {
            this.notify('REPLACE_ALL');
        }
    },

    reorderTasks(reorderedSubset) {
        this.saveUndoState();

        // 1. Find all tasks that are currently hidden (not in reorderedSubset)
        // We do this by creating a Set of IDs from the subset and filtering the whole list.
        const subsetIds = new Set(reorderedSubset.map(t => t.id));
        const hiddenTasks = this.tasks.filter(t => !subsetIds.has(t.id));

        // 2. The new task list is the reordered subset followed by all hidden tasks.
        // This effectively moves the visible, sorted tasks to the top of the file,
        // maintaining their exact visual order, while keeping everything else at the bottom.
        this.tasks = [...reorderedSubset, ...hiddenTasks];

        this.saveToPersistence();
        this.notify('REORDER_TASKS');
    },

    moveTask(id, direction) {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= this.tasks.length) return;

        this.saveUndoState();
        const tasks = [...this.tasks];
        [tasks[index], tasks[newIndex]] = [tasks[newIndex], tasks[index]];
        this.tasks = tasks;
        this.saveToPersistence();
        this.notify('MOVE_TASK');
    },


    deleteTask(id) {
        this.saveUndoState();
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveToPersistence();
        this.notify();
    },

    deleteTasks(idsRef) {
        if (!idsRef || idsRef.length === 0) return;
        // Normalize to Set for O(1) lookups if array passed
        const ids = new Set(idsRef);

        this.saveUndoState();
        this.tasks = this.tasks.filter(t => !ids.has(t.id));
        this.saveToPersistence();
        this.notify('BULK_DELETE');
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

        // Update parsed object properties for consistency
        // (Parsing the raw string is arguably safer but let's trust our mutation here)

        this.saveToPersistence();
        this.notify('TOGGLE_TASK');
    },

    // Simplified getter for now
    getTasks() {
        return this.tasks;
    }
};
