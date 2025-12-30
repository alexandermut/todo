import React, { useState, useEffect, useRef } from 'react';
import { Store } from '../store';
import { useGoogleContacts } from '../hooks/useGoogleContacts';
import { resolveDateAlias, getDateAliases } from '../utils/dateAliases';

export function TaskItem({ task, selected, onSelect, selectionMode, isFocused, isEditingProp, onEditEnd, onFilterClick }) {
    const [isEditing, setIsEditing] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionType, setSuggestionType] = useState(null); // 'contact' or 'date'
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef(null);

    // Google Contacts Hook
    const { searchContacts } = useGoogleContacts();

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
        if (onEditEnd) onEditEnd();
    };

    // Check for tokens under cursor
    const handleInput = async (e) => {
        const val = e.target.value;
        const pos = e.target.selectionStart;
        setCursorPosition(pos);

        // Auto-resize
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        // Detect Token
        const textBeforeCursor = val.substring(0, pos);
        const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
        const currentToken = textBeforeCursor.substring(lastSpaceIndex + 1);

        // 1. Contact Search
        if (currentToken.startsWith('contact:')) {
            const query = currentToken.substring(8);
            if (query.length > 1) {
                const results = await searchContacts(query);
                setSuggestions(results);
                setSuggestionType('contact');
                setShowSuggestions(results.length > 0);
            } else {
                setShowSuggestions(false);
            }
        }
        // 2. Date Alias Search (due:)
        else if (currentToken.startsWith('due:')) {
            const query = currentToken.substring(4).toLowerCase();
            // Show all aliases that match query
            const allAliases = getDateAliases();
            // Filter keys
            const matches = Object.keys(allAliases).filter(key => key.startsWith(query));

            if (matches.length > 0) {
                const dateSuggestions = matches.map(alias => ({
                    id: alias,
                    name: alias, // e.g. "morgen"
                    value: allAliases[alias], // e.g. "2025-12-31"
                    type: 'date'
                }));
                setSuggestions(dateSuggestions);
                setSuggestionType('date');
                setShowSuggestions(true);
            } else {
                // If query is valid date part (2025...), mostly ignore or help?
                // For now only help with textual aliases
                setShowSuggestions(false);
            }
        }
        else {
            setShowSuggestions(false);
        }
    };

    const applySuggestion = (item) => {
        if (!textareaRef.current) return;
        const val = textareaRef.current.value;
        const pos = cursorPosition;
        const textBeforeCursor = val.substring(0, pos);
        const textAfterCursor = val.substring(pos);
        const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
        const startOfToken = lastSpaceIndex + 1;
        const prefix = val.substring(0, startOfToken);

        let insertion = '';

        if (suggestionType === 'contact') {
            const safeName = item.name.replace(/\s+/g, '_');
            const tel = item.phone ? `tel:${item.phone.replace(/\s+/g, '')}` : '';
            const mail = item.email ? `mail:${item.email}` : '';
            insertion = `contact:${safeName} ${tel} ${mail}`.trim();
        } else if (suggestionType === 'date') {
            insertion = `due:${item.value}`;
        }

        const newVal = prefix + insertion + ' ' + textAfterCursor;
        textareaRef.current.value = newVal;
        // Keep editing
        // Update store but don't close
        Store.updateTask(task.id, newVal);
        textareaRef.current.focus();
        setShowSuggestions(false);
    };

    const selectContact = (contact) => applySuggestion(contact); // Alias for backward compat

    const priorityClass = {
        'A': 'text-red-400',
        'B': 'text-amber-400',
        'C': 'text-sky-400'
    }[task.priority] || 'text-gray-400';

    // Basic rich text parsing
    const renderText = (text) => {
        const parts = text.split(/(\+[a-zA-Z0-9äöüÄÖÜß._-]+|@[a-zA-Z0-9äöüÄÖÜß._-]+|#[a-zA-Z0-9äöüÄÖÜß._-]+|due:\d{4}-\d{2}-\d{2}|tel:[+0-9]+|mail:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|contact:[a-zA-Z0-9äöüÄÖÜß._-]+)/g);

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
                <textarea
                    ref={textareaRef}
                    defaultValue={task.raw}
                    autoFocus
                    className="w-full bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400 resize-none overflow-hidden"
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
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleEdit(e.target.value);
                        } else if (e.key === 'Escape') {
                            setIsEditing(false);
                            if (onEditEnd) onEditEnd();
                        }
                    }}
                    onBlur={(e) => {
                        setTimeout(() => handleEdit(e.target.value), 200);
                    }}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-4 top-full mt-1 w-64 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800">
                            {suggestionType === 'contact' ? 'Contacts' : 'Dates'}
                        </div>
                        {suggestions.map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="px-3 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    applySuggestion(item);
                                }}
                            >
                                {suggestionType === 'contact' ? (
                                    <>
                                        {item.photo ? (
                                            <img src={item.photo} alt="" className="w-6 h-6 rounded-full" />
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="overflow-hidden">
                                            <div className="text-sm text-zinc-200 truncate">{item.name}</div>
                                            <div className="text-xs text-zinc-500 truncate">
                                                {item.email || item.phone || 'No details'}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">
                                            📅
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-zinc-200 font-medium capitalize">{item.name}</div>
                                            <div className="text-xs text-zinc-500">{item.value}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`group flex items-center py-1 -mx-4 px-4 transition-colors cursor-pointer
                hover:bg-zinc-900 
                ${selected ? 'bg-blue-900/20' : ''} 
                ${isFocused ? 'bg-zinc-800 ring-1 ring-zinc-700' : ''}`}
            data-id={task.id}
            onClick={() => setIsEditing(true)}
        >
            {/* 2. Selection (Visible on Hover/Selected) */}
            <div className="mr-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
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
                    {task.priority && <span className={`text-xs font-bold mr-1 ${priorityClass}`}>({task.priority})</span>}
                    {renderText(task.text)}
                </div>
            </div>

            {/* Actions (Right) */}
            <div className="flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
