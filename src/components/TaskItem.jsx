import React, { useState, useEffect } from 'react';
import { Store } from '../store';

export function TaskItem({ task, selected, onSelect, selectionMode, isFocused, isEditingProp, onEditEnd, onFilterClick }) {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (isEditingProp) {
            setIsEditing(true);
        }
    }, [isEditingProp]);

    const handleToggle = (e) => {
        e.stopPropagation();
        Store.toggleTask(task.id);
    };

    const handleEdit = (newRaw) => {
        Store.updateTask(task.id, newRaw);
        setIsEditing(false);
        if (onEditEnd) onEditEnd();
    };

    const priorityClass = {
        'A': 'text-red-400',
        'B': 'text-amber-400',
        'C': 'text-sky-400'
    }[task.priority] || 'text-gray-400';

    // Basic rich text parsing for projects/contexts/tags/dates
    const renderText = (text) => {
        const parts = text.split(/(\+[\w.-]+|@[\w.-]+|#[\w.-]+|due:\d{4}-\d{2}-\d{2})/g);
        return parts.map((part, i) => {
            if (part.startsWith('+')) {
                return (
                    <span
                        key={i}
                        onClick={(e) => { e.stopPropagation(); onFilterClick && onFilterClick('project', part.substring(1)); }}
                        className="text-cyan-400 hover:underline cursor-pointer"
                    >
                        {part}
                    </span>
                );
            }
            if (part.startsWith('@')) {
                return (
                    <span
                        key={i}
                        onClick={(e) => { e.stopPropagation(); onFilterClick && onFilterClick('context', part.substring(1)); }}
                        className="text-emerald-400 hover:underline cursor-pointer"
                    >
                        {part}
                    </span>
                );
            }
            if (part.startsWith('#')) {
                return (
                    <span
                        key={i}
                        onClick={(e) => { e.stopPropagation(); onFilterClick && onFilterClick('tag', part.substring(1)); }}
                        className="text-purple-400 hover:underline cursor-pointer"
                    >
                        {part}
                    </span>
                );
            }
            if (part.startsWith('due:')) {
                const dateValue = part.substring(4);
                return (
                    <span
                        key={i}
                        onClick={(e) => { e.stopPropagation(); onFilterClick && onFilterClick('date', dateValue); }}
                        className="text-red-400 hover:underline cursor-pointer"
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    if (isEditing) {
        return (
            <div className="py-2 -mx-4 px-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-100 dark:border-zinc-700">
                <input
                    type="text"
                    defaultValue={task.raw}
                    autoFocus
                    className="w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEdit(e.target.value);
                        } else if (e.key === 'Escape') {
                            setIsEditing(false);
                            if (onEditEnd) onEditEnd();
                        }
                    }}
                    onBlur={(e) => handleEdit(e.target.value)}
                />
            </div>
        );
    }

    return (
        <div
            className={`group flex items-center py-1 border-b border-gray-800 hover:bg-zinc-900 -mx-4 px-4 transition-colors cursor-pointer 
                ${selected ? 'bg-blue-900/20' : ''} 
                ${isFocused ? 'bg-zinc-800 ring-1 ring-zinc-700' : ''}`}
            data-id={task.id}
            onClick={() => setIsEditing(true)}
        >
            {/* 2. Selection (Always Visible) */}
            <div className="mr-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={selected || false}
                    onChange={(e) => {
                        onSelect && onSelect();
                    }}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </div>

            {/* 3. Toggle Complete (Circle) */}
            <button
                onClick={handleToggle}
                className={`mr-3 w-5 h-5 rounded-full border border-zinc-500 hover:border-zinc-300 flex items-center justify-center text-transparent hover:text-zinc-500 transition-all ${task.completed ? '!bg-zinc-500 !border-zinc-500 text-white !text-white' : ''}`}
            >
                {task.completed ? '✓' : ''}
            </button>

            {/* 4. Content */}
            <div className="flex-1 min-w-0">
                <div className={`text-sm text-zinc-200 ${task.completed ? 'line-through text-zinc-500' : ''}`}>
                    {task.priority && <span className={`text-xs font-bold mr-2 ${priorityClass}`}>({task.priority})</span>}
                    {renderText(task.text)}
                </div>

            </div>

            {/* Actions (Right) */}
            <div className="flex items-center ml-2">
                <button
                    onClick={(e) => { e.stopPropagation(); Store.deleteTask(task.id); }}
                    className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                    title="Delete task"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
