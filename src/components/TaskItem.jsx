import React from 'react';
import { Store } from '../store';

export function TaskItem({ task, selected, onSelect, isFocused, onTaskFocus, onEdit, onFilterClick }) {

    const handleToggle = (e) => {
        e.stopPropagation();
        Store.toggleTask(task.id);
    };

    const handlePriorityContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Generate A-Z + null
        const priorities = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
        priorities.push(null);

        const current = task.priority || null;
        let nextIndex = 0;

        if (current) {
            const idx = priorities.indexOf(current);
            nextIndex = (idx + 1) % priorities.length;
        } else {
            // Start at A if no priority
            nextIndex = 0;
        }

        const nextPriority = priorities[nextIndex];

        let newRaw = task.raw;
        const hasPriority = /^\([A-Z]\)\s/.test(newRaw);

        if (nextPriority) {
            if (hasPriority) {
                newRaw = newRaw.replace(/^\([A-Z]\)\s/, `(${nextPriority}) `);
            } else {
                newRaw = `(${nextPriority}) ` + newRaw;
            }
        } else {
            // Removing priority
            if (hasPriority) {
                newRaw = newRaw.replace(/^\([A-Z]\)\s/, '');
            }
        }

        Store.updateTask(task.id, newRaw);
    };

    const priorityClass = {
        'A': 'text-red-400',
        'B': 'text-amber-400',
        'C': 'text-sky-400'
    }[task.priority] || 'text-gray-400';

    const renderText = (text) => {
        const parts = text.split(/(\+[a-zA-Z0-9äöüÄÖÜß._-]+|@[a-zA-Z0-9äöüÄÖÜß._-]+|#[a-zA-Z0-9äöüÄÖÜß._-]+|due:(?:\d{4}-\d{2}-\d{2}|\d{1,2}\.\d{1,2}\.\d{2,4})|tel:[+0-9]+|mail:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|contact:[a-zA-Z0-9äöüÄÖÜß._-]+)/g);

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
            if (part.startsWith('tel:')) {
                return (
                    <a
                        key={i}
                        href={part}
                        onClick={(e) => e.stopPropagation()}
                        className="text-lime-400 hover:underline inline-flex items-center gap-1"
                        title="Call"
                    >
                        <span className="opacity-50">📞</span>{part.substring(4)}
                    </a>
                );
            }
            if (part.startsWith('mail:')) {
                const email = part.substring(5);
                return (
                    <a
                        key={i}
                        href={`mailto:${email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-orange-400 hover:underline inline-flex items-center gap-1"
                        title="Send Email"
                    >
                        <span className="opacity-50">✉️</span>{email}
                    </a>
                );
            }
            if (part.startsWith('contact:')) {
                return (
                    <span
                        key={i}
                        className="text-indigo-400 font-medium inline-flex items-center gap-1"
                    >
                        <span className="opacity-50">👤</span> {part.substring(8).replace(/_/g, ' ')}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div
            className={`group flex items-center py-2 -mx-4 px-4 transition-colors cursor-pointer border-b border-zinc-800/30
                ${selected ? 'bg-blue-900/10' : ''} 
                ${isFocused ? 'bg-zinc-800/50 ring-1 ring-zinc-700/50' : 'hover:bg-zinc-900/30'}`}
            data-id={task.id}
            onMouseEnter={() => onTaskFocus && onTaskFocus(task.id)}
            onClick={(e) => {
                // Trigger edit on click - Clean and Simple
                e.preventDefault();
                e.stopPropagation(); // Prevent bubbling just in case
                if (onEdit) {
                    onEdit(task);
                }
            }}
            onContextMenu={handlePriorityContextMenu}
        >
            {/* 1. Selection (Visible on Hover/Selected/Focused) */}
            <div className={`mr-3 flex-shrink-0 transition-opacity ${selected || isFocused ? 'opacity-100' : 'opacity-0'}`} onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={selected || false}
                    onChange={() => { }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect && onSelect(e);
                    }}
                    className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </div>

            {/* 2. Toggle Complete (Circle) */}
            <button
                onClick={handleToggle}
                className={`mr-3 w-5 h-5 rounded-full border border-zinc-500 hover:border-zinc-300 flex items-center justify-center text-transparent hover:text-zinc-500 transition-all ${task.completed ? '!bg-zinc-500 !border-zinc-500 text-white !text-white' : ''}`}
            >
                {task.completed ? '✓' : ''}
            </button>

            {/* 3. Content */}
            <div className="flex-1 min-w-0">
                <div className={`text-sm text-zinc-200 ${task.completed ? 'line-through text-zinc-500' : ''}`}>
                    {task.priority && (
                        <span
                            className={`text-xs font-bold mr-1 hover:underline cursor-pointer ${priorityClass}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onFilterClick && onFilterClick('priority', task.priority);
                            }}
                        >
                            ({task.priority})
                        </span>
                    )}
                    {renderText(task.text)}
                </div>
            </div>

            {/* Actions (Right) */}
            <div className={`flex items-center gap-1 ml-2 transition-opacity ${isFocused || 'group-hover:opacity-100'} opacity-0 sm:opacity-0`}>
                {/* Pencil / Edit Button (Especially for Mobile) */}
                <button
                    onClick={(e) => { e.stopPropagation(); onEdit && onEdit(task); }}
                    className="p-2 text-zinc-500 hover:text-blue-400 transition-colors"
                    title="Edit task"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>

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
