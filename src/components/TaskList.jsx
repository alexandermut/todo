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
                <div className="text-center py-12 px-4">
                    {/* Logo + Brand */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <img src="/icons/todotext-appicon-dark-192.png" alt="" className="w-12 h-12" />
                        <h2 className="text-2xl font-semibold text-zinc-300">todotext.de</h2>
                    </div>

                    {/* Getting Started */}
                    <div className="text-gray-500 font-medium mb-6">Get started</div>
                    <div className="text-left max-w-md mx-auto space-y-3 text-sm text-gray-500">
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>Type in the search bar to add a task</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>Use <code className="px-1 py-0.5 bg-zinc-800 rounded text-xs">+project</code> <code className="px-1 py-0.5 bg-zinc-800 rounded text-xs">@context</code> to organize</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>Sync with Google Drive or Dropbox (settings ⚙️)</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span>Works offline-first, syncs when online</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
