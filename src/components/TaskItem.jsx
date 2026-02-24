import React from 'react';
import { Store } from '../store';

export function TaskItem({ task, selected, onSelect, isFocused, onTaskFocus, onEdit, onFilterClick, dragHandleProps, isDragging, selectionCount }) {

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
        // Regex now includes wiki links \[\[.*?\]\]
        const parts = text.split(/(\[\[.*?\]\]|\+[a-zA-Z0-9äöüÄÖÜß._-]+|@[a-zA-Z0-9äöüÄÖÜß._-]+|#[a-zA-Z0-9äöüÄÖÜß._-]+|due:(?:\d{4}-\d{2}-\d{2}|\d{1,2}\.\d{1,2}\.\d{2,4})|tel:[+0-9]+|mail:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|contact:[a-zA-Z0-9äöüÄÖÜß._-]+)/g);

        return parts.map((part, i) => {
            if (part.startsWith('[[') && part.endsWith(']]')) {
                const inner = part.slice(2, -2);
                const isTask = inner.startsWith('task:');
                const query = isTask ? inner.substring(5) : inner;
                const href = isTask ? `/?search=${encodeURIComponent(query)}` : `/?note=${encodeURIComponent(query)}`;
                const title = isTask ? `Aufgaben suchen: ${query}` : `Notiz öffnen: ${query}`;

                return (
                    <a
                        key={i}
                        href={href}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.history.pushState({}, '', href);
                            window.dispatchEvent(new Event('popstate'));
                        }}
                        className="text-yellow-400 hover:underline cursor-pointer font-medium"
                        title={title}
                    >
                        {part}
                    </a>
                );
            }
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
            {...dragHandleProps}
            className={`group relative flex items-center py-2 -mx-4 px-4 transition-colors border-b border-zinc-800/30
                ${selected ? 'bg-blue-900/10' : ''} 
                ${isFocused ? 'bg-zinc-800/50 ring-1 ring-zinc-700/50' : 'hover:bg-zinc-900/30'}
                ${isDragging ? 'cursor-grabbing opacity-90 z-50 bg-zinc-900 shadow-2xl ring-1 ring-blue-500/50' : 'cursor-grab'}
            `}
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
            {/* Multi-Drag Badge */}
            {isDragging && selected && selectionCount > 1 && (
                <div className="absolute -top-3 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xl border border-blue-400 z-50 shadow-blue-900/50 pointer-events-none flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                    {selectionCount} Aufgaben ziehen
                </div>
            )}

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
            <div className="flex items-center gap-1 ml-2">
                <button
                    onClick={(e) => { e.stopPropagation(); Store.deleteTask(task.id); }}
                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                    title="Delete task"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
