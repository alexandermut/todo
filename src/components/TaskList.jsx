import React, { useState, useMemo } from 'react';
import { TaskItem } from './TaskItem';
import logo from '../assets/logo.png';

export function TaskList({ tasks, activeFilter, selectedTaskIds, onTaskSelect, focusedTaskId, editingTaskId, onEditEnd, onFilterClick, projects, contexts, tags }) {
    const [sortCriteria, setSortCriteria] = useState('none'); // 'none', 'priority', 'due', 'alpha'

    const getTitle = () => {
        if (!activeFilter) return 'Inbox';
        switch (activeFilter.type) {
            case 'inbox': return 'Inbox';
            case 'today': return 'Today';
            case 'upcoming': return 'Upcoming';
            case 'project': return `${activeFilter.value}`;
            case 'context': return `@${activeFilter.value}`;
            default: return 'Inbox';
        }
    };

    const sortedTasks = useMemo(() => {
        const sorted = [...tasks];
        switch (sortCriteria) {
            case 'priority':
                return sorted.sort((a, b) => {
                    if (a.priority && !b.priority) return -1;
                    if (!a.priority && b.priority) return 1;
                    if (a.priority && b.priority) return a.priority.localeCompare(b.priority);
                    return 0;
                });
            case 'alpha':
                return sorted.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
            case 'due':
                return sorted.sort((a, b) => {
                    const dueA = a.due || '9999-99-99';
                    const dueB = b.due || '9999-99-99';
                    return dueA.localeCompare(dueB);
                });
            default:
                return sorted;
        }
    }, [tasks, sortCriteria]);

    return (
        <div className="pb-20">
            <header className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-zinc-100">{getTitle()}</h1>
                    <div className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                </div>

                {/* Sort Control */}
                {tasks.length > 0 && (
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-zinc-500 font-medium">Sort:</label>
                        <select
                            value={sortCriteria}
                            onChange={(e) => setSortCriteria(e.target.value)}
                            className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 outline-none focus:border-blue-500 cursor-pointer"
                        >
                            <option value="none">Default</option>
                            <option value="priority">Priority</option>
                            <option value="due">Due Date</option>
                            <option value="alpha">A-Z</option>
                        </select>
                    </div>
                )}
            </header>

            <div className="mb-4">
                {sortedTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        selected={selectedTaskIds?.has(task.id)}
                        onSelect={() => onTaskSelect && onTaskSelect(task.id)}
                        selectionMode={selectedTaskIds && selectedTaskIds.size > 0}
                        isFocused={focusedTaskId === task.id}
                        isEditingProp={editingTaskId === task.id}
                        onEditEnd={onEditEnd}
                        onFilterClick={onFilterClick}
                        projects={projects}
                        contexts={contexts}
                        tags={tags}
                    />
                ))}
            </div>


            {tasks.length === 0 && (
                <div className="py-8">
                    {/* Logo + Brand - Left Aligned */}
                    <div className="flex items-center gap-3 mb-12">
                        <img src={logo} alt="todotext.de" className="w-10 h-10" />
                        <h2 className="text-xl font-semibold text-zinc-300">todotext.de</h2>
                        <span className="text-[10px] text-zinc-600 font-mono mt-1 ml-2">{__APP_VERSION__}</span>
                    </div>

                    <div className="space-y-12 max-w-xl">

                        {/* Syntax Guide */}
                        <div className="space-y-5">
                            <h3 className="text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                Syntax Guide
                            </h3>
                            <div className="space-y-4 text-sm text-zinc-400">
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1.5">Projects & Contexts</div>
                                    <div className="flex gap-2">
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">+project</code>
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">@context</code>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1.5">Priorities</div>
                                    <div className="flex gap-2">
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">(A)</code>
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">(B)</code>
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">(C)</code>
                                        <span className="text-zinc-500 text-xs self-center ml-1">start of line</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1.5">Key:Value Tags</div>
                                    <div className="flex flex-wrap gap-2">
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">due:2025-12-31</code>
                                        <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-800/50">rec:1w</code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shortcuts */}
                        <div className="space-y-5">
                            <h3 className="text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                Keyboard Shortcuts
                            </h3>
                            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm text-zinc-400 items-baseline">
                                <span className="justify-self-start"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">/</kbd></span>
                                <span>Focus search / New Task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">↑</kbd> <span className="text-zinc-600 text-[10px] px-0.5">/</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">↓</kbd></span>
                                <span>Navigate tasks</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">←</kbd> <span className="text-zinc-600 text-[10px] px-0.5">/</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">→</kbd></span>
                                <span>Change priority</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">x</kbd></span>
                                <span>Complete task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">e</kbd></span>
                                <span>Edit task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">⌘</kbd> <span className="text-zinc-600 text-[10px] px-0.5">+</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">z</kbd></span>
                                <span>Undo action</span>
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="pt-8 border-t border-zinc-800/50">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-zinc-500">
                                <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> Google Drive & Dropbox Sync</span>
                                <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg> Offline-first</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
