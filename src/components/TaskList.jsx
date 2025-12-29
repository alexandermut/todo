import React from 'react';
import { TaskItem } from './TaskItem';

export function TaskList({ tasks, activeFilter, selectedTaskIds, onTaskSelect, focusedTaskId, editingTaskId, onEditEnd }) {

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
                    />
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-10">
                    <div className="mb-4 text-6xl">🎉</div>
                    <div className="text-gray-800 font-medium">All clear</div>
                    <div className="text-gray-500 text-sm mt-2">Looks like everything's organized in the right place.</div>
                </div>
            )}
        </div>
    );
}
