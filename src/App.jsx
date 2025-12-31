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

import { CalendarPopup } from './components/CalendarPopup';
import { sortTasks } from './utils/sortUtils';

import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import logo from './assets/logo.png';

function App() {
    const [tasks, setTasks] = useState(Store.getTasks());
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
    const [sortCriteria, setSortCriteria] = useState('none');

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
        const unsubscribe = Store.subscribe((updatedTasks) => {
            setTasks([...updatedTasks]);
        });
        Store.init();
        return () => {
            Store.unsubscribe(unsubscribe)
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
                    result = result.filter(t => t.projects.includes(activeFilter.value));
                    break;
                case 'context':
                    result = result.filter(t => t.contexts && t.contexts.includes(activeFilter.value));
                    break;
                case 'tag':
                    result = result.filter(t => t.tags && t.tags.includes(activeFilter.value));
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
        setSearchQuery('');
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
        tasksToUpdate.forEach(t => {
            if (!t.completed) {
                Store.toggleTask(t.id);
            }
        });
        setSelectedTaskIds(new Set());
    };

    const handleBulkDelete = () => {
        Array.from(selectedTaskIds).forEach(id => Store.deleteTask(id));
        setSelectedTaskIds(new Set());
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
        onTaskEdit: (id) => {
            setEditingTaskId(id);
        },
        onTaskPriority: (id, action) => {
            const task = tasks.find(t => t.id === id);
            if (!task) return;

            if (['A', 'B', 'C', null].includes(action)) {
                Store.setTaskPriority(id, action);
                return;
            }

            const priorities = [null, 'C', 'B', 'A'];
            let currentIdx = priorities.indexOf(task.priority || null);
            if (currentIdx === -1) currentIdx = 0;

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

    const SortButton = ({ label, value, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-medium transition-colors border ${isActive
                ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
                }`}
        >
            {label}
            {isActive && sortCriteria.includes('desc') && <span className="ml-1 opacity-60">↓</span>}
            {isActive && !sortCriteria.includes('desc') && !sortCriteria.includes('none') && <span className="ml-1 opacity-60">↑</span>}
        </button>
    );

    return (
        <>
            <div className="flex flex-col h-[100dvh]">

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
                                <a href="/datenschutz.html" className="hover:text-zinc-400 transition-colors hidden sm:block">Datenschutz</a>
                                <a href="/impressum.html" className="hover:text-zinc-400 transition-colors hidden sm:block">Impressum</a>
                                <span className="hidden sm:inline">•</span>
                                <span className="font-mono opacity-50">{__APP_VERSION__}</span>
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
                        />

                        <div className="max-w-2xl mx-auto w-full px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
                            <SortButton
                                label="Default"
                                value="none"
                                isActive={sortCriteria === 'none'}
                                onClick={() => setSortCriteria('none')}
                            />
                            <SortButton
                                label="Priority"
                                value="priority"
                                isActive={sortCriteria.startsWith('priority')}
                                onClick={() => handleSortClick('priority')}
                            />
                            <SortButton
                                label="Project"
                                value="project"
                                isActive={sortCriteria.startsWith('project')}
                                onClick={() => handleSortClick('project')}
                            />
                            <SortButton
                                label="Context"
                                value="context"
                                isActive={sortCriteria.startsWith('context')}
                                onClick={() => handleSortClick('context')}
                            />
                            <SortButton
                                label="Due Date"
                                value="due"
                                isActive={sortCriteria.startsWith('due')}
                                onClick={() => handleSortClick('due')}
                            />
                            <SortButton
                                label="A-Z"
                                value="alpha"
                                isActive={sortCriteria.startsWith('alpha')}
                                onClick={() => handleSortClick('alpha-asc')}
                            />
                        </div>
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
                        onGTasksSync={() => isAuthenticated ? syncPushTasks(tasks) : login()}
                        onGTasksPull={syncPullTasks}
                        onClearAll={() => {
                            if (window.confirm(`Are you sure you want to delete all ${tasks.length} tasks? This cannot be undone (but you can undo with Cmd+Z).`)) {
                                Store.clearAllTasks();
                            }
                        }}
                    />

                    <main id="main-content" className="flex-1 overflow-y-auto bg-zinc-950 flex justify-center transition-colors pb-32">
                        <div className="w-full max-w-2xl px-4 sm:px-6 md:px-8 py-6">
                            {/* Branding Header Removed (Moved to Top) */}

                            <div className="space-y-2">
                                {currentPage === 'impressum' ? (
                                    <Impressum onBack={() => setCurrentPage('tasks')} />
                                ) : currentPage === 'datenschutz' ? (
                                    <Datenschutz onBack={() => setCurrentPage('tasks')} />
                                ) : (
                                    <TaskList
                                        tasks={filteredTasks}
                                        activeFilter={activeFilter}
                                        selectedTaskIds={selectedTaskIds}
                                        onTaskSelect={handleTaskSelect}
                                        focusedTaskId={focusedTaskId}
                                        onTaskFocus={setFocusedTaskId}
                                        editingTaskId={editingTaskId}
                                        onEditEnd={(id) => {
                                            setEditingTaskId(null);
                                            // Restore focus to the task that was just edited/cancelled
                                            if (id) setFocusedTaskId(id);
                                        }}
                                        projects={projects}
                                        contexts={contexts}
                                        tags={tags}
                                        onOpenCalendar={openCalendar}
                                        onFilterClick={(type, value) => {
                                            let prefix = '';
                                            if (type === 'project') prefix = '+';
                                            if (type === 'context') prefix = '@';
                                            if (type === 'tag') prefix = '#';
                                            if (type === 'date') prefix = 'due:';

                                            const token = `${prefix}${value}`;

                                            // Append to search query
                                            if (!searchQuery.includes(token)) {
                                                setSearchQuery(prev => prev ? `${prev} ${token}` : token);
                                            }
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
                        onPageNavigate={setCurrentPage}
                    />

                    <BulkActionsBar
                        selectedCount={selectedTaskIds.size}
                        onDeselectAll={() => setSelectedTaskIds(new Set())}
                        onCompleteAll={handleBulkComplete}
                        onDeleteAll={handleBulkDelete}
                    />
                </div>

                {/* BOTTOM: Footer Removed */}


            </div>
            {/* Global Calendar Popup */}
            {calendarState.isOpen && (
                <CalendarPopup
                    onSelect={(date) => {
                        if (calendarState.onSelect) calendarState.onSelect(date);
                        setCalendarState({ ...calendarState, isOpen: false });
                    }}
                    onClose={() => setCalendarState({ ...calendarState, isOpen: false })}
                />
            )}
        </>
    );
}

export default App;
