import React from 'react';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, activeFilter, selectedTaskIds, onTaskSelect, focusedTaskId, editingTaskId, onEditEnd, onFilterClick }) {

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

    return (
        <div className="pb-20">
            <header className="mb-6">
                <h1 className="text-xl font-bold text-gray-800">{getTitle()}</h1>
                <div className="text-xs text-gray-500 mt-1">{new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}</div>
            </header>

            <div className="mb-4">
                {tasks.map(task => (
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
                    />
                ))}
            </div>


            {tasks.length === 0 && (
                <div className="py-12 px-4">
                    {/* Logo + Brand */}
                    <div className="flex items-center justify-center gap-3 mb-10">
                        <img src="/icons/todotext-appicon-dark-192.png" alt="" className="w-12 h-12" />
                        <h2 className="text-2xl font-semibold text-zinc-300">todotext.de</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-2xl mx-auto">

                        {/* Syntax Guide */}
                        <div className="space-y-4">
                            <h3 className="text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                Syntax Guide
                            </h3>
                            <div className="space-y-4 text-sm text-zinc-400">
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1">Projects & Contexts</div>
                                    <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">+project</code> <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">@context</code>
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1">Priorities</div>
                                    <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">(A)</code> <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">(B)</code> <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">(C)</code> start of line
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1">Key:Value Tags</div>
                                    <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">due:2025-12-31</code> <code className="text-zinc-300 bg-zinc-900/50 px-1.5 py-0.5 rounded">rec:1w</code>
                                </div>
                            </div>
                        </div>

                        {/* Shortcuts */}
                        <div className="space-y-4">
                            <h3 className="text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                Keyboard Shortcuts
                            </h3>
                            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm text-zinc-400 items-baseline">
                                <span className="justify-self-start"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">/</kbd></span>
                                <span>Focus search / New Task</span>

                                <span className="justify-self-start"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">x</kbd></span>
                                <span>Complete task</span>

                                <span className="justify-self-start"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">e</kbd></span>
                                <span>Edit task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">p</kbd> <span className="text-zinc-600 text-[10px] px-0.5">+</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">a-c</kbd></span>
                                <span>Set priority</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">⌘</kbd> <span className="text-zinc-600 text-[10px] px-0.5">+</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 rounded text-zinc-300 font-mono text-[10px]">z</kbd></span>
                                <span>Undo action</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-flex items-center gap-6 text-xs text-zinc-600">
                            <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> Syncs with Google Drive & Dropbox</span>
                            <span className="flex items-center gap-1.5"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg> Offline-first</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
