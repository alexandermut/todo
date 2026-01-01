import React, { useState, useEffect, useRef } from 'react';
import { Store } from '../store';
import { get_completions } from 'todo-parser';

// Note: We need to receive projects, contexts, tags via props
export function TaskItem({ task, selected, onSelect, selectionMode, isFocused, onTaskFocus, isEditingProp, onEditEnd, onFilterClick, projects, contexts, tags }) {
    const [isEditing, setIsEditing] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);

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
        setShowSuggestions(false);
        if (onEditEnd) onEditEnd(task.id);
        // Ensure focus remains here for keyboard nav
        if (onTaskFocus) onTaskFocus(task.id);
    };

    const [suggestionIndex, setSuggestionIndex] = useState(0);

    // ... (rest of state)

    // Check for tokens under cursor
    const handleInput = async (e) => {
        const val = e.target.value;
        const pos = e.target.selectionStart;
        setCursorPosition(pos);

        // Auto-resize
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        // Use unified Rust completion logic
        const completions = get_completions(val, pos, projects || [], contexts || [], tags || []);

        if (completions && completions.length > 0) {
            const mapped = completions.map(c => ({
                id: c.id,
                name: c.display,
                value: c.value,
                type: c.category
            }));
            setSuggestions(mapped);
            setSuggestionIndex(0); // Reset selection
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    // ... (applySuggestion remains same)

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

    if (isEditing) {
        return (
            <div className="py-2 -mx-4 px-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-100 dark:border-zinc-700 relative">
                <div className="relative w-full">
                    <textarea
                        ref={textareaRef}
                        defaultValue={task.raw}
                        autoFocus
                        className="w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400 resize-none overflow-hidden pr-8"
                        rows={1}
                        onFocus={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                            const val = e.target.value;
                            e.target.value = '';
                            e.target.value = val;
                        }}
                        onInput={handleInput}
                        onKeyDown={(e) => {
                            if (showSuggestions && suggestions.length > 0) {
                                if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    setSuggestionIndex(prev => (prev + 1) % suggestions.length);
                                    return;
                                }
                                if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    setSuggestionIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
                                    return;
                                }
                                if (e.key === 'Tab' || e.key === 'Enter') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    applySuggestion(suggestions[suggestionIndex]);
                                    return;
                                }
                                if (e.key === 'Escape') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowSuggestions(false);
                                    return;
                                }
                            }

                            if (e.key === 'Enter') {
                                e.preventDefault();
                                e.stopPropagation();
                                try {
                                    handleEdit(e.target.value);
                                } catch (err) {
                                    console.error("Failed to save task:", err);
                                    setIsEditing(false);
                                    if (onEditEnd) onEditEnd(task.id);
                                }
                            } else if (e.key === 'Escape') {
                                setIsEditing(false);
                                if (onEditEnd) onEditEnd(task.id);
                            }
                        }}
                        onBlur={(e) => {
                            setTimeout(() => {
                                if (!showSuggestions) {
                                    try {
                                        handleEdit(e.target.value);
                                    } catch (err) {
                                        console.error("Failed to save task on blur:", err);
                                        setIsEditing(false);
                                    }
                                }
                            }, 200);
                        }}
                    />

                    {/* ... (rest of render) */}

                    {/* Calendar Picker Trigger */}
                    <div className="absolute right-0 top-1">
                        <button
                            type="button"
                            className="cursor-pointer text-zinc-500 hover:text-zinc-300 p-1 bg-transparent border-none outline-none"
                            onMouseDown={(e) => e.preventDefault()} // Try to prevent blur on click
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenCalendar && textareaRef.current) {
                                    const currentVal = textareaRef.current.value;
                                    const currentPos = cursorPosition;
                                    onOpenCalendar((dateStr) => {
                                        applySuggestion({ type: 'date', value: dateStr }, currentVal, currentPos);
                                    });
                                }
                            }}
                            title="Pick due date"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-4 top-full mt-1 w-64 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800">
                            Suggestions
                        </div>
                        {suggestions.map((item, idx) => {
                            let icon = '⚡';
                            let colorClass = 'text-zinc-400 bg-zinc-500/20';

                            if (item.type === 'date') { icon = '📅'; colorClass = 'text-red-400 bg-red-500/20'; }
                            else if (item.type === 'project') { icon = '+'; colorClass = 'text-cyan-400 bg-cyan-500/20'; }
                            else if (item.type === 'context') { icon = '@'; colorClass = 'text-emerald-400 bg-emerald-500/20'; }
                            else if (item.type === 'tag') { icon = '#'; colorClass = 'text-purple-400 bg-purple-500/20'; }

                            const isSelected = idx === suggestionIndex;

                            return (
                                <div
                                    key={item.id || idx}
                                    className={`px-3 py-2 cursor-pointer flex items-center gap-3 transition-colors ${isSelected ? 'bg-zinc-800' : 'hover:bg-zinc-800'}`}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        applySuggestion(item);
                                    }}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${colorClass}`}>
                                            {icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-zinc-200 font-medium capitalize">{item.name}</div>
                                            {item.type === 'date' && <div className="text-xs text-zinc-500">{item.value}</div>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`group flex items-center py-1 -mx-4 px-4 transition-colors cursor-pointer
                ${selected ? 'bg-blue-900/20' : ''} 
                ${isFocused ? 'bg-zinc-800 ring-1 ring-zinc-700' : ''}`}
            data-id={task.id}
            onMouseEnter={() => onTaskFocus && onTaskFocus(task.id)}
            onClick={() => {
                setIsEditing(true);
                if (onTaskFocus) onTaskFocus(task.id);
            }}
            onContextMenu={handlePriorityContextMenu}
        >
            {/* 2. Selection (Visible on Hover/Selected/Focused) */}
            <div className={`mr-3 flex-shrink-0 transition-opacity ${selected || isFocused ? 'opacity-100' : 'opacity-0'}`} onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    checked={selected || false}
                    onChange={() => { }} // Handled by onClick to capture modifier keys
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect && onSelect(e);
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
            <div className={`flex items-center ml-2 transition-opacity ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
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
