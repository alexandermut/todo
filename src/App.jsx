import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TaskList } from './components/TaskList';
import { BulkActionsBar } from './components/BulkActionsBar';
import { BottomSearch } from './components/BottomSearch';
import { Store } from './store';
import { useGoogleServices } from './hooks/useGoogleServices';
import { useDropbox } from './hooks/useDropbox';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { searchParser } from './utils/searchParser';
import { SettingsSidebar } from './components/SettingsSidebar';

import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';

function App() {
    const [tasks, setTasks] = useState(Store.getTasks());
    const [activeFilter, setActiveFilter] = useState({ type: 'inbox' }); // { type: 'inbox' | 'today' | 'upcoming' | 'project' | 'context' | 'tag', value: string }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [focusedTaskId, setFocusedTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleCloudLoad = (text) => {
        Store.loadFromString(text);
    };

    const { isAuthenticated, isSyncing, login, syncPushDrive, syncPullDrive, syncPushTasks, syncPullTasks } = useGoogleServices(handleCloudLoad);
    const {
        isAuthenticated: isDropboxAuth,
        isSyncing: isDropboxSyncing,
        login: loginDropbox,
        syncPush: syncPushDropbox,
        syncPull: syncPullDropbox
    } = useDropbox(handleCloudLoad);


    useEffect(() => {
        Store.init();
        const unsubscribe = Store.subscribe((updatedTasks) => {
            setTasks([...updatedTasks]);
        });
        return () => {
            // Store.unsubscribe(unsubscribe)
        };
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocusTrigger, setSearchFocusTrigger] = useState(0); // Simple counter to trigger strict mode ref focus

    const filteredTasks = useMemo(() => {
        let result = tasks;

        // Apply Search Filter (if not empty) with new parser
        if (searchQuery.trim()) {
            result = searchParser(result, searchQuery);
        }

        if (!activeFilter) return result;

        // ... (existing switch case logic)
        switch (activeFilter.type) {
            case 'today':
                const today = new Date().toISOString().split('T')[0];
                return result.filter(t => t.metadata && t.metadata.due === today);
            case 'upcoming':
                const todayStr = new Date().toISOString().split('T')[0];
                return result.filter(t => t.metadata && t.metadata.due > todayStr);
            case 'overdue':
                const nowStr = new Date().toISOString().split('T')[0];
                return result.filter(t => t.metadata && t.metadata.due && t.metadata.due < nowStr && !t.completed);
            case 'project':
                return result.filter(t => t.projects.includes(activeFilter.value));
            case 'context':
                return result.filter(t => t.contexts && t.contexts.includes(activeFilter.value));
            case 'tag':
                return result.filter(t => t.tags && t.tags.includes(activeFilter.value));
            case 'inbox':
            case 'impressum':
            case 'datenschutz':
            default:
                return result;
        }
    }, [tasks, activeFilter, searchQuery]);

    const handleQuickAdd = (text) => {
        if (!text.trim()) return;

        let finalTaskText = text;

        if (activeFilter) {
            switch (activeFilter.type) {
                case 'project':
                    finalTaskText += ` +${activeFilter.value}`;
                    break;
                case 'context':
                    finalTaskText += ` @${activeFilter.value}`;
                    break;
                case 'tag':
                    finalTaskText += ` #${activeFilter.value}`;
                    break;
                case 'today':
                    const today = new Date().toISOString().split('T')[0];
                    finalTaskText += ` due:${today}`;
                    break;
                case 'upcoming':
                    // Maybe add due:tomorrow? Or ask user? For now, leave as is or default to today?
                    break;
            }
        }

        Store.addTask(finalTaskText);
        setSearchQuery(''); // Clear after adding
    };

    const projects = useMemo(() => [...new Set(tasks.flatMap(t => t.projects || []))].sort(), [tasks]);
    const contexts = useMemo(() => [...new Set(tasks.flatMap(t => t.contexts || []))].sort(), [tasks]);
    const tags = useMemo(() => [...new Set(tasks.flatMap(t => t.tags || []))].sort(), [tasks]);

    const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());

    const handleTaskSelect = (id) => {
        const newSelected = new Set(selectedTaskIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedTaskIds(newSelected);
    };

    const handleBulkComplete = () => {
        const tasksToUpdate = tasks.filter(t => selectedTaskIds.has(t.id));
        tasksToUpdate.forEach(t => Store.updateTask(t.id, { completed: true }));
        setSelectedTaskIds(new Set());
    };

    const handleBulkDelete = () => {
        // We likely need a bulk delete on Store to be efficient/notify once, but loop works for now
        Array.from(selectedTaskIds).forEach(id => Store.deleteTask(id));
        setSelectedTaskIds(new Set());
    };

    // Keyboard Shortcuts Integration
    useKeyboardShortcuts({
        tasks: filteredTasks,
        focusedTaskId,
        setFocusedTaskId,
        setSearchFocus: () => setSearchFocusTrigger(prev => prev + 1),
        onTaskComplete: (id) => {
            Store.toggleTask(id);
        },
        onTaskDelete: (id) => Store.deleteTask(id),
        onTaskEdit: (id) => {
            setEditingTaskId(id);
        },
        onTaskPriority: (id, action) => {
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            // Direct assignment
            if (['A', 'B', 'C', null].includes(action)) {
                Store.setTaskPriority(id, action);
                return;
            }

            // Directional cycling
            const priorities = [null, 'C', 'B', 'A']; // Ascending order of importance
            let currentIdx = priorities.indexOf(task.priority || null);
            if (currentIdx === -1) currentIdx = 0; // treat unknown as null

            let newIdx = currentIdx;
            if (action === 'up') newIdx = Math.min(newIdx + 1, priorities.length - 1);
            if (action === 'down') newIdx = Math.max(newIdx - 1, 0);

            if (newIdx !== currentIdx) {
                Store.setTaskPriority(id, priorities[newIdx]);
            }
        },
        onUndo: () => Store.undo(),
        clearFilters: () => {
            setSearchQuery('');
            setActiveFilter({ type: 'inbox' });
            setIsSettingsOpen(false);
        }
    });

    return (
        <>
            <div className="flex flex-col h-full">
                <div className="flex flex-1 overflow-hidden relative">
                    <SettingsSidebar
                        isOpen={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                        // Sync Props passed here now
                        onSyncClick={() => isAuthenticated ? syncPushDrive(tasks) : login()}
                        onPullClick={syncPullDrive}
                        isSyncing={isSyncing}
                        isAuthenticated={isAuthenticated}
                        onDropboxSync={() => isDropboxAuth ? syncPushDropbox(tasks) : loginDropbox()}
                        onDropboxPull={syncPullDropbox}
                        isDropboxAuth={isDropboxAuth}
                        isDropboxSyncing={isDropboxSyncing}
                        onGTasksSync={() => isAuthenticated ? syncPushTasks(tasks) : login()}
                        onGTasksPull={syncPullTasks}
                        onClearAll={() => {
                            if (window.confirm(`Are you sure you want to delete all ${tasks.length} tasks? This cannot be undone (but you can undo with Cmd+Z).`)) {
                                Store.clearAllTasks();
                            }
                        }}
                    />

                    <main id="main-content" className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-8 flex justify-center transition-colors pb-32">
                        <div className="w-full max-w-3xl">
                            <div className="mt-8 space-y-2">
                                {activeFilter.type === 'impressum' ? (
                                    <Impressum />
                                ) : activeFilter.type === 'datenschutz' ? (
                                    <Datenschutz />
                                ) : (
                                    <TaskList
                                        tasks={filteredTasks}
                                        activeFilter={activeFilter}
                                        selectedTaskIds={selectedTaskIds}
                                        onTaskSelect={handleTaskSelect}
                                        focusedTaskId={focusedTaskId}
                                        editingTaskId={editingTaskId}
                                        onEditEnd={() => setEditingTaskId(null)}
                                        onFilterClick={(type, value) => {
                                            let prefix = '';
                                            if (type === 'project') prefix = '+';
                                            if (type === 'context') prefix = '@';
                                            if (type === 'tag') prefix = '#';
                                            if (type === 'date') prefix = 'due:';

                                            const token = `${prefix}${value}`;
                                            const currentQuery = searchQuery || '';

                                            // Toggle logic: if token exists, remove it; otherwise append it
                                            if (currentQuery.includes(token)) {
                                                const newQuery = currentQuery.replace(token, '').replace(/\s\s+/g, ' ').trim();
                                                setSearchQuery(newQuery);
                                            } else {
                                                // If empty, add leading space so cursor at 0 puts text BEFORE the filter
                                                const separator = currentQuery ? ' ' : ' ';
                                                const newQuery = (currentQuery || '') + separator + token;
                                                setSearchQuery(newQuery);
                                            }
                                            setSearchFocusTrigger(c => c + 1);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </main>

                    <Sidebar
                        activeFilter={activeFilter}
                        onFilterSelect={setActiveFilter}
                        projects={projects}
                        contexts={contexts}
                        tags={tags}
                        tasks={tasks}
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />

                    <BulkActionsBar
                        selectedCount={selectedTaskIds.size}
                        onDeselectAll={() => setSelectedTaskIds(new Set())}
                        onCompleteAll={handleBulkComplete}
                        onDeleteAll={handleBulkDelete}
                    />
                </div>

                {/* Fixed Bottom Search Bar */}
                <BottomSearch
                    searchValue={searchQuery}
                    onSearch={setSearchQuery}
                    onQuickAdd={handleQuickAdd}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    focusTrigger={searchFocusTrigger}
                    activeFilter={activeFilter}
                    onClearFilter={() => setActiveFilter({ type: 'inbox' })}
                />
            </div>
        </>
    );
}

export default App;
