import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { BulkActionsBar } from './components/BulkActionsBar';
import { BatchEditModal } from './components/BatchEditModal';
import { BottomSearch } from './components/BottomSearch';
import { FilterBar } from './components/FilterBar';
import { Store } from './store';
import { useGoogleServices } from './hooks/useGoogleServices';
import { useDropbox } from './hooks/useDropbox';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { searchParser } from './utils/searchParser';
import { SettingsSidebar } from './components/SettingsSidebar';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { NoteService } from './services/NoteService';

import { CalendarPopup } from './components/CalendarPopup';
import { sortTasks } from './utils/sortUtils';

import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { FAQ } from './components/FAQ';
import logo from './assets/logo.png';
import { NoteEditor } from './components/NoteEditor';


// --- MAIN COMPONENT ---
function App() {
    const [tasks, setTasks] = useState(Store.getTasks());

    // NOTE ENTRY POINT
    const [activeNote, setActiveNote] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('note');
    });



    const closeNoteEditor = () => {
        setActiveNote(null);
        // Clean up URL without reloading
        const url = new URL(window.location);
        url.searchParams.delete('note');
        window.history.pushState({}, '', url);
    };

    // Undo/Redo state proxies (derived from Store/Force Update?)
    // Actually, Store doesn't expose canUndo/canRedo reactively yet.
    // For now we just implement the actions. Visuals for canUndo/canRedo can be added later if needed.
    // Or we subscribe to Store full state including history counts?
    // Let's stick to actions first.

    const [activeFilter, setActiveFilter] = useState({ type: 'inbox' }); // { type: 'inbox' | 'today' | 'upcoming' | 'project' | 'context' | 'tag', value: string }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [focusedTaskId, setFocusedTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('tasks'); // 'tasks' | 'impressum' | 'datenschutz'

    // GLOBAL CALENDAR STATE
    const [calendarState, setCalendarState] = useState({ isOpen: false, onSelect: null });

    const openCalendar = (onSelectCallback) => {
        setCalendarState({ isOpen: true, onSelect: onSelectCallback });
    };

    // SORT STATE
    // SORT STATE
    const [sortCriteria, setSortCriteria] = useState('priority');
    // FILTER UI STATE
    const [openFilterCategory, setOpenFilterCategory] = useState(null);
    const [filterMode, setFilterMode] = useState('include'); // 'include' | 'exclude'

    const toggleFilterCategory = (category) => {
        setOpenFilterCategory(prev => prev === category ? null : category);
    };

    const handleCloudLoad = (text) => {
        Store.loadFromString(text);
    };

    // SETTINGS STATE
    const [archiveCompleted, setArchiveCompleted] = useState(() => {
        return localStorage.getItem('setting_archiveCompleted') === 'true';
    });

    const toggleArchive = () => {
        setArchiveCompleted(prev => {
            const next = !prev;
            localStorage.setItem('setting_archiveCompleted', next);
            return next;
        });
    };

    const [syncMode, setSyncMode] = useState(() => {
        return localStorage.getItem('setting_syncMode') || 'auto';
    });

    const changeSyncMode = (mode) => {
        setSyncMode(mode);
        localStorage.setItem('setting_syncMode', mode);
    };

    const {
        isAuthenticated,
        isSyncing,
        login,
        syncPushDrive,
        syncPullDrive,
        syncPushTasks,
        syncPullTasks,
        checkForRemoteUpdates: checkDriveUpdates
    } = useGoogleServices(handleCloudLoad, archiveCompleted);

    const {
        isAuthenticated: isDropboxAuth,
        isSyncing: isDropboxSyncing,
        login: loginDropbox,
        syncPush: syncPushDropbox,
        syncPull: syncPullDropbox,
        lastSyncTime: dropboxLastSync,
        checkForRemoteUpdates: checkDropboxUpdates
    } = useDropbox(handleCloudLoad, archiveCompleted);

    // REMOVED: isMyOwnUpdate ref - superseded by reliable source check in Store

    useEffect(() => {
        const unsubscribe = Store.subscribe((updatedTasks) => {
            setTasks([...updatedTasks]);
        });
        Store.init();
        return () => {
            Store.unsubscribe(unsubscribe)
        };
    }, []);



    const [searchQuery, setSearchQuery] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('search') || '';
    });
    const [searchFocusTrigger, setSearchFocusTrigger] = useState(0);

    // When the user clicks a Note or Search link, we stay in the same tab
    useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setActiveNote(params.get('note'));

            const sp = params.get('search');
            if (sp !== null) {
                setSearchQuery(sp);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // --- Editing State & Handlers (Must be before useKeyboardShortcuts) ---
    const [editingTask, setEditingTask] = useState(null);
    const [isBatchEditModalOpen, setIsBatchEditModalOpen] = useState(false);

    const handleStartEdit = (task) => {
        setEditingTask(task);
        setSearchQuery(task.raw);
        setSearchFocusTrigger(prev => prev + 1);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setSearchQuery('');
    };

    const handleQuickAdd = (rawText) => {
        if (!rawText.trim()) return;

        if (editingTask) {
            // Update
            Store.updateTask(editingTask.id, rawText);
            setEditingTask(null);
            setSearchQuery('');
        } else {
            // Add New
            const newTask = Store.addTask(rawText);
            setSearchQuery('');
        }
    };
    // ---------------------------------------------------------------------

    // AUTO-SYNC (Dropbox & Google Drive)
    // Automatically push changes to Cloud 3 seconds after the last modification.
    useEffect(() => {
        if (syncMode === 'auto' && tasks.length > 0) {
            const timer = setTimeout(() => {
                if (isDropboxAuth) {
                    console.log("☁️ Auto-Syncing to Dropbox...");
                    syncPushDropbox(tasks);
                }
                if (isAuthenticated) {
                    console.log("☁️ Auto-Syncing to Google Drive...");
                    syncPushDrive(tasks);
                }
            }, 3000); // 3s Debounce

            return () => clearTimeout(timer);
        }
    }, [tasks, isDropboxAuth, isAuthenticated, syncMode]);

    // AUTO-PULL (Polling + OnFocus)
    useEffect(() => {
        if (syncMode !== 'auto') return;

        const checkUpdates = () => {
            // SAFETY: Don't pull if user modified tasks recently (wait for auto-push to finish)
            // Giving it a 10s buffer to be safe (Push debounce is 3s + network time)
            if (Date.now() - Store.lastModificationTime < 10000) {
                console.log("⏳ Skipping Auto-Pull (User is active)...");
                return;
            }

            if (isAuthenticated && checkDriveUpdates) {
                console.log("🔍 Auto-Pull Check (GDrive)...");
                checkDriveUpdates();
            }
            if (isDropboxAuth && checkDropboxUpdates) {
                console.log("🔍 Auto-Pull Check (Dropbox)...");
                checkDropboxUpdates();
            }
        };

        // 1. Interval (e.g., every 60s)
        const intervalId = setInterval(checkUpdates, 60000);

        // 2. On Window Focus
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                console.log("👀 Window Focused - Checking for updates...");
                checkUpdates();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isAuthenticated, isDropboxAuth, checkDriveUpdates, checkDropboxUpdates]);

    const filteredTasks = useMemo(() => {
        let result = tasks;

        // Apply Search Filter (if not empty) with new parser
        if (searchQuery.trim()) {
            result = searchParser(result, searchQuery);
        }

        if (activeFilter) {
            switch (activeFilter.type) {
                case 'today':
                    const today = new Date().toISOString().split('T')[0];
                    result = result.filter(t => t.metadata && t.metadata.due === today);
                    break;
                case 'upcoming':
                    const todayStr = new Date().toISOString().split('T')[0];
                    result = result.filter(t => t.metadata && t.metadata.due > todayStr);
                    break;
                case 'overdue':
                    const nowStr = new Date().toISOString().split('T')[0];
                    result = result.filter(t => t.metadata && t.metadata.due && t.metadata.due < nowStr && !t.completed);
                    break;
                case 'project':
                    result = result.filter(t => t.projects && t.projects.includes(activeFilter.value));
                    break;
                case 'context':
                    result = result.filter(t => t.contexts && t.contexts.includes(activeFilter.value));
                    break;
                case 'tag':
                    result = result.filter(t => t.tags && t.tags.includes(activeFilter.value));
                    break;
                case 'priority':
                    // Priority is stored as 'A', 'B', 'C' or null/undefined
                    result = result.filter(t => t.priority === activeFilter.value);
                    break;
                case 'inbox':
                case 'impressum':
                case 'datenschutz':
                default:
                    // no filter
                    break;
            }
        }

        // Apply Sorting
        return sortTasks(result, sortCriteria);

    }, [tasks, activeFilter, searchQuery, sortCriteria]);

    // Unified Filter Handler (Additive)
    const handleFilterClick = (type, value) => {
        let prefix = '';
        let token = '';

        // Determine prefix based on type
        if (type === 'project') prefix = '+';
        else if (type === 'context') prefix = '@';
        else if (type === 'tag') prefix = '#';
        else if (type === 'priority') {
            // Value is 'A' -> (A)
            token = `(${value})`;
        }
        else if (type === 'alpha') {
            token = `^${value}`;
        }
        else if (type === 'date') prefix = 'due:';

        // For special filters (today, upcoming, etc - handled by ActiveFilter usually, but if we want them searching?)
        // Let's keep specific filters (today/upcoming) as activeFilter navigation if they don't map to text search easily
        // But Project/Context/Tag/Priority map to text.

        if (!token) {
            token = `${prefix}${value}`;
        }

        // Handle negation if in exclude mode
        if (filterMode === 'exclude') {
            token = `-${token}`;
        }

        // Append to search query
        // Append or Remove from search query (Toggle logic)
        setSearchQuery(prev => {
            const currentTokens = prev ? prev.trim().split(/\s+/) : [];

            // Check if exact token exists
            if (currentTokens.includes(token)) {
                // Remove it
                const newTokens = currentTokens.filter(t => t !== token);
                return newTokens.join(' ');
            } else {
                // Add it
                return [...currentTokens, token].join(' ');
            }
        });

        // Also ensure we are not in a conflicting activeFilter mode?
        // Actually, if we use Search, activeFilter is ignored by our logic?
        // No, filteredTasks uses BOTH. 
        // If we want "Clicking FilterBar" to *only* set search, we should probably clear activeFilter if it was set to something else?
        // Or just let them coexist. 
        // But if FilterBar used to set activeFilter, we should stop doing that for these types.
    };



    const projects = useMemo(() => [...new Set(tasks.flatMap(t => t.projects || []))].sort(), [tasks]);
    const contexts = useMemo(() => [...new Set(tasks.flatMap(t => t.contexts || []))].sort(), [tasks]);
    const tags = useMemo(() => [...new Set(tasks.flatMap(t => t.tags || []))].sort(), [tasks]);

    const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
    const [lastSelectedId, setLastSelectedId] = useState(null);

    const handleTaskSelect = (id, e) => {
        let newSelected = new Set(selectedTaskIds);

        // Range Selection (Shift + Click)
        if (e && e.shiftKey && lastSelectedId && lastSelectedId !== id) {
            const tasksList = filteredTasks; // Use currently visible tasks
            const lastIndex = tasksList.findIndex(t => t.id === lastSelectedId);
            const currentIndex = tasksList.findIndex(t => t.id === id);

            if (lastIndex !== -1 && currentIndex !== -1) {
                const start = Math.min(lastIndex, currentIndex);
                const end = Math.max(lastIndex, currentIndex);

                // Add range to selection
                for (let i = start; i <= end; i++) {
                    newSelected.add(tasksList[i].id);
                }
            }
        }
        // Additive/Toggle Selection (Cmd/Ctrl + Click or standard click)
        else {
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            setLastSelectedId(id);
        }

        setSelectedTaskIds(newSelected);
    };

    const handleSelectAll = () => {
        // If all visible are selected, deselect all visible.
        // Otherwise, select all visible.
        const visibleIds = filteredTasks.map(t => t.id);
        const allVisibleSelected = visibleIds.every(id => selectedTaskIds.has(id));

        const newSelected = new Set(selectedTaskIds);

        if (allVisibleSelected) {
            visibleIds.forEach(id => newSelected.delete(id));
        } else {
            visibleIds.forEach(id => newSelected.add(id));
        }

        setSelectedTaskIds(newSelected);
    };

    const handleBulkComplete = () => {
        const tasksToUpdate = tasks.filter(t => selectedTaskIds.has(t.id));
        tasksToUpdate.forEach(t => {
            if (!t.completed) {
                Store.toggleTask(t.id);
            }
        });
        setSelectedTaskIds(new Set());
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Delete ${selectedTaskIds.size} tasks?`)) {
            Array.from(selectedTaskIds).forEach(id => Store.deleteTask(id));
            setSelectedTaskIds(new Set());
        }
    };

    const [isGlobalBatchEdit, setIsGlobalBatchEdit] = useState(false);

    const handleOpenGlobalBatchEdit = () => {
        setIsGlobalBatchEdit(true);
        setIsBatchEditModalOpen(true);
    };

    const handleBatchEditorSave = (instructions) => {
        const { priority, dueDate, renames, additions } = instructions;

        // Ensure additions are split into tokens
        const additionTokens = additions ? additions.split(/\s+/).filter(t => t.length > 0) : [];

        const updates = [];

        const targetTaskIds = isGlobalBatchEdit
            ? tasks.map(t => t.id)
            : Array.from(selectedTaskIds);

        targetTaskIds.forEach(id => {
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            let newRaw = task.raw;

            // 1. Process Renames/Removals of Metadata
            Object.entries(renames).forEach(([original, current]) => {
                // We need to exactly match the original token as a whole word.
                // e.g. replacing '+pro1' with '+pro2' or removing it entirely.
                // Escape regex specials
                const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(^|\\s)${escaped}(?!\\S)`, 'g');

                if (current === '') {
                    // Remove it entirely, keep the leading space/boundary
                    newRaw = newRaw.replace(regex, '$1');
                } else {
                    // Replace it
                    newRaw = newRaw.replace(regex, `$1${current}`);
                }
            });

            // 2. Process Additions
            if (additionTokens.length > 0) {
                // Only add if not already present
                additionTokens.forEach(token => {
                    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`(^|\\s)${escaped}(?!\\S)`);
                    if (!regex.test(newRaw)) {
                        newRaw = `${newRaw} ${token}`;
                    }
                });
            }

            // Clean up multiple spaces that might have been left by removals
            newRaw = newRaw.replace(/\s+/g, ' ').trim();

            // 3. Update Priority via Store method (it's safest since it handles the (A) syntax perfectly)
            if (priority !== 'MIXED') {
                // Update the raw string in memory, then let Store handle the actual save later
                // Actually, Store.setTaskPriority saves immediately. 
                // Let's manually manipulate the string here to save just once at the end if possible, 
                // OR we just use Store updates iteratively.
                newRaw = newRaw.replace(/^\([A-Z]\)\s/, "");
                if (priority) {
                    newRaw = `(${priority}) ${newRaw}`;
                }
            }

            // 4. Update Due Date
            if (dueDate !== 'MIXED') {
                const dueRegex = /\bdue:\S+/g;
                if (!dueDate) {
                    // Remove due date
                    newRaw = newRaw.replace(dueRegex, '');
                } else {
                    if (dueRegex.test(newRaw)) {
                        newRaw = newRaw.replace(dueRegex, `due:${dueDate}`);
                    } else {
                        newRaw = `${newRaw} due:${dueDate}`;
                    }
                }
            }

            // Final cleanup
            newRaw = newRaw.replace(/\s+/g, ' ').trim();

            if (newRaw !== task.raw) {
                updates.push({ id, newRaw });
            }
        });

        if (updates.length > 0) {
            Store.updateTasks(updates);
        }

        setIsBatchEditModalOpen(false);
        setIsGlobalBatchEdit(false);
        if (!isGlobalBatchEdit) {
            setSelectedTaskIds(new Set());
        }
    };

    const handleRenameGlobalMetadata = (type, oldName, newName) => {
        let prefix = '';
        if (type === 'project') prefix = '+';
        else if (type === 'context') prefix = '@';
        else if (type === 'tag') prefix = '#';

        const original = prefix + oldName;
        const current = newName ? prefix + newName : '';

        const updates = [];
        const escaped = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(^|\\s)${escaped}(?!\\S)`, 'g');

        tasks.forEach(task => {
            let newRaw = task.raw;
            if (regex.test(newRaw)) {
                regex.lastIndex = 0; // reset for multiple uses if needed
                if (current === '') {
                    newRaw = newRaw.replace(regex, '$1');
                } else {
                    newRaw = newRaw.replace(regex, `$1${current}`);
                }
                newRaw = newRaw.replace(/\s+/g, ' ').trim();

                if (newRaw !== task.raw) {
                    updates.push({ id: task.id, newRaw });
                }
            }
        });

        if (updates.length > 0) {
            Store.updateTasks(updates);
        }
    };

    useKeyboardShortcuts({
        tasks: filteredTasks,
        focusedTaskId,
        setFocusedTaskId,
        setSearchFocus: () => setSearchFocusTrigger(prev => prev + 1),
        onTaskComplete: (id) => {
            Store.toggleTask(id);
        },
        onTaskDelete: (id) => Store.deleteTask(id),
        onTasksDelete: (ids) => {
            Store.deleteTasks(ids);
            setSelectedTaskIds(new Set()); // Clear selection after delete
        },
        onTaskEdit: (id) => {
            const task = tasks.find(t => t.id === id);
            if (task) handleStartEdit(task);
        },
        clearFilters: () => {
            setSearchQuery('');
            setActiveFilter({ type: 'inbox' });
        },
        onUndo: () => Store.undo(),
        onRedo: () => Store.redo(),
        onClearSelection: () => setSelectedTaskIds(new Set()),
        selectedTaskIds,
        onSelectTask: (id, shouldSelect = true) => {
            setSelectedTaskIds(prev => {
                const next = new Set(prev);
                if (shouldSelect) {
                    next.add(id);
                } else {
                    next.delete(id);
                }
                return next;
            });
        },
        onTaskPriority: (id, action) => {
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            if (['A', 'B', 'C', null].includes(action)) {
                Store.setTaskPriority(id, action);
                return;
            }

            // Generate priorities: A-Z, then null
            const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
            const priorities = [...alphabet, null];

            let currentIdx = priorities.indexOf(task.priority || null);
            if (currentIdx === -1) currentIdx = priorities.length - 1; // Default to null if unknown

            let newIdx = currentIdx;
            if (action === 'up') {
                newIdx = (currentIdx + 1) % priorities.length;
            }
            if (action === 'down') {
                newIdx = (currentIdx - 1 + priorities.length) % priorities.length;
            }

            if (newIdx !== currentIdx) {
                Store.setTaskPriority(id, priorities[newIdx]);
            }
        }
    });

    const clearFilters = () => {
        setSearchQuery('');
        setActiveFilter({ type: 'inbox' });
    };

    // DRAG AND DROP HANDLER
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const draggedId = result.draggableId;

        // Determine which items are moving
        let itemsToMoveIds = new Set();
        if (selectedTaskIds && selectedTaskIds.has(draggedId)) {
            itemsToMoveIds = new Set(selectedTaskIds);
        } else {
            itemsToMoveIds = new Set([draggedId]);
        }

        if (sourceIndex === destinationIndex && itemsToMoveIds.size <= 1) return;

        const draggedTask = filteredTasks[sourceIndex];

        // 1. Get the items in their original visual order
        const itemsToMove = filteredTasks.filter(t => itemsToMoveIds.has(t.id));

        // 2. Simulate single-item drag to find the correct insertion point among unselected items
        const singleReordered = Array.from(filteredTasks);
        singleReordered.splice(sourceIndex, 1);
        singleReordered.splice(destinationIndex, 0, draggedTask);

        // 3. Split the simulated array at the destination index
        const beforeDragged = singleReordered.slice(0, destinationIndex);
        const afterDragged = singleReordered.slice(destinationIndex + 1);

        // 4. Strip out any selected items from these prefix and suffix arrays
        const unselectedBefore = beforeDragged.filter(t => !itemsToMoveIds.has(t.id));
        const unselectedAfter = afterDragged.filter(t => !itemsToMoveIds.has(t.id));

        // 5. The final order is simply the unselected prefix + the selected block + the unselected suffix
        const finalReorderedSubset = [...unselectedBefore, ...itemsToMove, ...unselectedAfter];

        // Save to store (appends hidden tasks to the bottom automatically)
        Store.reorderTasks(finalReorderedSubset);

        // Force sort to 'none' so the user immediately sees the raw file order they just established
        setSortCriteria('none');
    };

    const handleSortClick = (base) => {
        if (base === 'alpha-asc') {
            if (sortCriteria === 'alpha-asc') setSortCriteria('alpha-desc');
            else setSortCriteria('alpha-asc');
            return;
        }
        if (sortCriteria === base) {
            setSortCriteria(`${base}-desc`);
        } else if (sortCriteria === `${base}-desc`) {
            setSortCriteria(base);
        } else {
            setSortCriteria(base);
        }
    };

    const SortButton = ({ icon, label, value, isActive, onClick }) => (
        <button
            onClick={onClick}
            title={label}
            className={`whitespace-nowrap p-2 rounded-lg text-xs font-medium transition-colors border ${isActive
                ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
                }`}
        >
            <div className="flex items-center justify-center gap-1">
                {icon}
                {isActive && sortCriteria.includes('desc') && <span className="opacity-60 text-[10px]">↓</span>}
                {isActive && !sortCriteria.includes('desc') && !sortCriteria.includes('none') && <span className="opacity-60 text-[10px]">↑</span>}
            </div>
        </button>
    );

    const handleExport = async () => {
        try {
            const zip = new JSZip();

            // 1. Add todo.txt
            const todoText = Store.dumpToString();
            zip.file('todo.txt', todoText);

            // 2. Add done.txt if needed (Store currently manages both as tasks with completed state)
            const doneTasks = tasks.filter(t => t.completed).map(t => t.raw).join('\n');
            if (doneTasks) {
                zip.file('done.txt', doneTasks);
            }

            // 3. Add Notes
            const allNotes = NoteService.getAllNotes();
            const noteNames = Object.keys(allNotes);
            if (noteNames.length > 0) {
                const notesFolder = zip.folder('notes');
                noteNames.forEach(name => {
                    notesFolder.file(`${name}.md`, allNotes[name]);
                });
            }

            // Generate ZIP
            const blob = await zip.generateAsync({ type: 'blob' });
            saveAs(blob, 'todotext_export.zip');
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please check the console.");
        }
    };

    const handleImport = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            Store.loadFromString(text);
        };
        reader.readAsText(file);
    };

    // If a note is active via URL parameter, only render the NoteEditor
    if (activeNote) {
        return <NoteEditor noteName={activeNote} onClose={closeNoteEditor} />;
    }

    return (
        <>
            <div className="flex flex-col h-[100dvh]">
                <PWAInstallPrompt />

                {/* TOP: Search & Sort Bar */}
                {currentPage === 'tasks' && (
                    <div className="bg-zinc-950 border-b border-zinc-800 flex flex-col pt-[max(env(safe-area-inset-top),16px)] z-30 relative shrink-0">
                        {/* Branding - Above Search */}
                        <div className="flex items-center justify-between px-4 pb-2">
                            <div className="flex items-center gap-3">
                                <img src={logo} alt="todotext.de" className="w-8 h-8" />
                                <h2 className="text-lg font-semibold text-zinc-300">todotext.de</h2>
                            </div>

                            <div className="flex items-center gap-3 text-[10px] text-zinc-600">
                                <button
                                    onClick={() => setCurrentPage('faq')}
                                    className="p-1.5 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors"
                                    title="Help & FAQ"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <a href="/datenschutz.html" className="hover:text-zinc-400 transition-colors hidden sm:block">Datenschutz</a>
                                <a href="/impressum.html" className="hover:text-zinc-400 transition-colors hidden sm:block">Impressum</a>
                            </div>
                        </div>




                        <BottomSearch
                            searchValue={searchQuery}
                            onSearch={setSearchQuery}
                            onQuickAdd={handleQuickAdd}
                            onMenuClick={() => setIsSidebarOpen(true)}
                            onSettingsClick={() => setIsSettingsOpen(true)}
                            focusTrigger={searchFocusTrigger}
                            activeFilter={activeFilter}
                            onClearFilter={() => setActiveFilter({ type: 'inbox' })}
                            projects={projects}
                            contexts={contexts}
                            tags={tags}
                            onOpenCalendar={openCalendar}
                            isEditing={!!editingTask}
                            onCancelEdit={handleCancelEdit}
                        />

                        {/* Active Filter Chips - Hide when editing */}
                        {searchQuery.trim() && !editingTask && (
                            <div className="flex flex-wrap gap-2 px-4 py-2 animate-in fade-in zoom-in-95 duration-200">
                                {searchQuery.trim().split(/\s+/).map((token, idx) => (
                                    <div key={idx} className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1 text-xs text-zinc-300">
                                        <span className="font-medium">{token}</span>
                                        <button
                                            onClick={() => {
                                                const newQuery = searchQuery.trim().split(/\s+/).filter((_, i) => i !== idx).join(' ');
                                                setSearchQuery(newQuery);
                                            }}
                                            className="ml-1 p-0.5 rounded-full hover:bg-zinc-700 text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="max-w-2xl mx-auto w-full px-4 py-2 flex items-start gap-2 overflow-x-auto no-scrollbar">
                            {/* Default / Clear Sort */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="Default"
                                    value="none"
                                    isActive={sortCriteria === 'none'}
                                    onClick={() => setSortCriteria('none')}
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}
                                />
                                {/* Filter Mode Toggle (+/-) */}
                                <button
                                    onClick={() => setFilterMode(prev => prev === 'include' ? 'exclude' : 'include')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors font-bold text-xs ${filterMode === 'include' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
                                    title={filterMode === 'include' ? "Current Mode: Include (+)" : "Current Mode: Exclude (-)"}
                                >
                                    {filterMode === 'include' ? '+' : '-'}
                                </button>
                            </div>

                            {/* Priority */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="Priority"
                                    value="priority"
                                    isActive={sortCriteria.startsWith('priority')}
                                    onClick={() => handleSortClick('priority')}
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                                />
                                <button
                                    onClick={() => toggleFilterCategory('priority')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors ${openFilterCategory === 'priority' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300'}`}
                                >
                                    <svg className={`w-3 h-3 transition-transform ${openFilterCategory === 'priority' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* Project */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="Project"
                                    value="project"
                                    isActive={sortCriteria.startsWith('project')}
                                    onClick={() => handleSortClick('project')}
                                    // Use Plus Icon (+) as requested
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
                                />
                                <button
                                    onClick={() => toggleFilterCategory('project')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors ${openFilterCategory === 'project' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300'}`}
                                >
                                    <svg className={`w-3 h-3 transition-transform ${openFilterCategory === 'project' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* Context */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="Context"
                                    value="context"
                                    isActive={sortCriteria.startsWith('context')}
                                    onClick={() => handleSortClick('context')}
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>}
                                />
                                <button
                                    onClick={() => toggleFilterCategory('context')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors ${openFilterCategory === 'context' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300'}`}
                                >
                                    <svg className={`w-3 h-3 transition-transform ${openFilterCategory === 'context' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* Tag */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="Tag"
                                    value="tag"
                                    isActive={sortCriteria.startsWith('tag')}
                                    onClick={() => handleSortClick('tag')}
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>}
                                />
                                <button
                                    onClick={() => toggleFilterCategory('tag')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors ${openFilterCategory === 'tag' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300'}`}
                                >
                                    <svg className={`w-3 h-3 transition-transform ${openFilterCategory === 'tag' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* Date */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="Due Date"
                                    value="due"
                                    isActive={sortCriteria.startsWith('due')}
                                    onClick={() => handleSortClick('due')}
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                />
                                <button
                                    onClick={() => toggleFilterCategory('date')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors ${openFilterCategory === 'date' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300'}`}
                                >
                                    <svg className={`w-3 h-3 transition-transform ${openFilterCategory === 'date' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* A-Z Sort (No wrapper needed if staying single, but wrapper for consistency) */}
                            <div className="flex flex-col gap-1 min-w-max">
                                <SortButton
                                    label="A-Z"
                                    value="alpha"
                                    isActive={sortCriteria.startsWith('alpha')}
                                    onClick={() => handleSortClick('alpha-asc')}
                                    icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" /></svg>}
                                />
                                <button
                                    onClick={() => toggleFilterCategory('alpha')}
                                    className={`w-full h-6 flex items-center justify-center rounded-md transition-colors ${openFilterCategory === 'alpha' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-800 hover:text-zinc-300'}`}
                                >
                                    <svg className={`w-3 h-3 transition-transform ${openFilterCategory === 'alpha' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>
                        </div>


                        <FilterBar
                            projects={projects}
                            contexts={contexts}
                            tags={tags}
                            activeFilter={activeFilter}
                            onFilterSelect={(filterObj) => {
                                // If it's a type we handle via search (project, context, tag, priority), use search handler
                                if (['project', 'context', 'tag', 'priority', 'alpha'].includes(filterObj.type)) {
                                    handleFilterClick(filterObj.type, filterObj.value);
                                } else {
                                    // Fallback for others (like date ranges if not text based, or 'today')
                                    setActiveFilter(filterObj);
                                }
                            }}
                            openCategory={openFilterCategory}
                            onClose={() => setOpenFilterCategory(null)}
                        />

                        <BulkActionsBar
                            selectedCount={selectedTaskIds.size}
                            onDeselectAll={() => setSelectedTaskIds(new Set())}
                            onCompleteAll={handleBulkComplete}
                            onDeleteAll={handleBulkDelete}
                            onOpenBatchEdit={() => setIsBatchEditModalOpen(true)}
                        />
                    </div>
                )}

                {/* MIDDLE: Main Content */}
                <div className="flex flex-1 overflow-hidden relative">
                    <SettingsSidebar
                        isOpen={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                        onSyncClick={() => isAuthenticated ? syncPushDrive(tasks) : login()}
                        onPullClick={syncPullDrive}
                        isSyncing={isSyncing}
                        isAuthenticated={isAuthenticated}
                        onDropboxSync={() => isDropboxAuth ? syncPushDropbox(tasks) : loginDropbox()}
                        onDropboxPull={syncPullDropbox}
                        isDropboxAuth={isDropboxAuth}
                        isDropboxSyncing={isDropboxSyncing}
                        dropboxLastSync={dropboxLastSync}
                        archiveCompleted={archiveCompleted}
                        onToggleArchive={toggleArchive}
                        syncMode={syncMode}
                        onSyncModeChange={changeSyncMode}
                        onExport={handleExport}
                        onImport={handleImport}
                        onGTasksSync={() => isAuthenticated ? syncPushTasks(tasks) : login()}
                        onGTasksPull={syncPullTasks}
                        onClearAll={() => {
                            if (window.confirm(`Are you sure you want to delete all ${tasks.length} tasks? This cannot be undone (but you can undo with Cmd+Z).`)) {
                                Store.clearAllTasks();
                            }
                        }}
                    />

                    <main id="main-content" className="flex-1 overflow-y-auto bg-zinc-950 flex justify-center transition-colors pb-32">
                        <div className="w-full max-w-2xl px-4 sm:px-6 md:px-8 pt-2 pb-6">
                            {/* Branding Header Removed (Moved to Top) */}

                            <div className="space-y-2">
                                {currentPage === 'impressum' ? (
                                    <Impressum onBack={() => setCurrentPage('tasks')} />
                                ) : currentPage === 'datenschutz' ? (
                                    <Datenschutz onBack={() => setCurrentPage('tasks')} />
                                ) : currentPage === 'faq' ? (
                                    <FAQ onBack={() => setCurrentPage('tasks')} />
                                ) : (
                                    <TaskList
                                        onDragEnd={handleDragEnd}
                                        tasks={filteredTasks}
                                        activeFilter={activeFilter}
                                        selectedTaskIds={selectedTaskIds}
                                        onTaskSelect={handleTaskSelect}
                                        onSelectAll={handleSelectAll}
                                        focusedTaskId={focusedTaskId}
                                        onTaskFocus={setFocusedTaskId}
                                        editingTaskId={editingTaskId}
                                        onEdit={handleStartEdit} // Pass the edit handler
                                        onEditEnd={(id) => {
                                            setEditingTaskId(null);
                                            // Restore focus to the task that was just edited/cancelled
                                            if (id) setFocusedTaskId(id);
                                        }}
                                        projects={projects}
                                        contexts={contexts}
                                        tags={tags}
                                        onOpenCalendar={openCalendar}
                                        onFilterClick={handleFilterClick}
                                    />
                                )}
                            </div>
                        </div>
                    </main>

                    <Sidebar
                        activeFilter={activeFilter}
                        onFilterSelect={(filterObj) => {
                            if (['project', 'context', 'tag'].includes(filterObj.type)) {
                                handleFilterClick(filterObj.type, filterObj.value);
                            } else {
                                setActiveFilter(filterObj);
                            }
                        }}
                        projects={projects}
                        contexts={contexts}
                        tags={tags}
                        tasks={tasks}
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        onPageNavigate={setCurrentPage}
                        syncMode={syncMode}
                        onSyncModeChange={changeSyncMode}
                        onManageMetadata={handleOpenGlobalBatchEdit}
                        onRenameMetadata={handleRenameGlobalMetadata}
                    />

                </div>

                {/* BOTTOM: Footer Removed */}




            </div >

            <BatchEditModal
                isOpen={isBatchEditModalOpen}
                onClose={() => {
                    setIsBatchEditModalOpen(false);
                    setIsGlobalBatchEdit(false);
                }}
                selectedTasks={isGlobalBatchEdit ? tasks : filteredTasks.filter(t => selectedTaskIds.has(t.id))}
                onSave={handleBatchEditorSave}
                onOpenCalendar={openCalendar}
            />

            {/* Global Calendar Popup */}
            {
                calendarState.isOpen && (
                    <CalendarPopup
                        onSelect={(date) => {
                            if (calendarState.onSelect) calendarState.onSelect(date);
                            setCalendarState({ ...calendarState, isOpen: false });
                        }}
                        onClose={() => setCalendarState({ ...calendarState, isOpen: false })}
                    />
                )
            }
        </>
    );
}

export default App;
