import React, { useRef, useEffect, useState } from 'react';
import { get_completions } from 'todo-parser';

// Update props to include lists
export function BottomSearch({ searchValue, onSearch, onQuickAdd, onMenuClick, onSettingsClick, focusTrigger, activeFilter, onClearFilter, projects, contexts, tags }) {
    const inputRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);

    useEffect(() => {
        if (focusTrigger > 0 && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(0, 0);
        }
    }, [focusTrigger]);

    // Input Handler for Autocomplete
    const handleInput = async (e) => {
        const val = e.target.value;
        const pos = e.target.selectionStart;
        setCursorPosition(pos);

        // Propagate changes to parent
        onSearch(val);

        // Use unified usage
        const completions = get_completions(val, pos, projects || [], contexts || [], tags || []);

        if (completions && completions.length > 0) {
            const mapped = completions.map(c => ({
                id: c.id,
                name: c.display,
                value: c.value,
                type: c.category
            }));
            setSuggestions(mapped);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const applySuggestion = (item) => {
        if (!inputRef.current) return;

        const val = inputRef.current.value;
        const pos = cursorPosition;

        const textBeforeCursor = val.substring(0, pos);
        const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ');
        const startOfToken = lastSpaceIndex + 1;

        const textAfterCursor = val.substring(pos);
        const nextSpaceIndex = textAfterCursor.indexOf(' ');
        const endOfToken = nextSpaceIndex === -1 ? val.length : pos + nextSpaceIndex;

        const prefix = val.substring(0, startOfToken);
        const suffix = val.substring(endOfToken);

        let insertion = '';
        if (item.type === 'date') insertion = `due:${item.value}`;
        else if (item.type === 'project') insertion = `+${item.value}`;
        else if (item.type === 'context') insertion = `@${item.value}`;
        else if (item.type === 'tag') insertion = `#${item.value}`;
        else insertion = item.value;

        const newVal = prefix + insertion + suffix;
        const newCursorPos = prefix.length + insertion.length;

        onSearch(newVal); // Update parent state
        // Focus back
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 10);
        setShowSuggestions(false);
    };

    // Determine badge content and color
    let badge = null;
    if (activeFilter) {
        if (activeFilter.type === 'project') {
            badge = { text: `+${activeFilter.value}`, className: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' };
        } else if (activeFilter.type === 'context') {
            badge = { text: `@${activeFilter.value}`, className: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
        } else if (activeFilter.type === 'tag') {
            badge = { text: `#${activeFilter.value}`, className: 'text-purple-400 bg-purple-400/10 border-purple-400/20' };
        } else if (activeFilter.type === 'today') {
            badge = { text: `📅 Today`, className: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
        } else if (activeFilter.type === 'upcoming') {
            badge = { text: `🗓 Upcoming`, className: 'text-purple-400 bg-purple-400/10 border-purple-400/20' };
        } else if (activeFilter.type === 'overdue') {
            badge = { text: `⚠️ Overdue`, className: 'text-red-400 bg-red-400/10 border-red-400/20' };
        }
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-40 flex items-center gap-3">
            {/* Search / Add Input Container */}
            <div className="relative flex-1 group">

                {/* Autocomplete Dropdown - Positioned ABOVE input */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute bottom-full left-0 mb-2 w-full sm:w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800 flex justify-between">
                            <span>Suggestions</span>
                            <span className="text-[10px] bg-zinc-800 px-1 rounded">TAB to select</span>
                        </div>
                        {suggestions.map((item) => {
                            let icon = '⚡';
                            let colorClass = 'text-zinc-400 bg-zinc-500/20';

                            if (item.type === 'date') { icon = '📅'; colorClass = 'text-red-400 bg-red-500/20'; }
                            else if (item.type === 'project') { icon = '+'; colorClass = 'text-cyan-400 bg-cyan-500/20'; }
                            else if (item.type === 'context') { icon = '@'; colorClass = 'text-emerald-400 bg-emerald-500/20'; }
                            else if (item.type === 'tag') { icon = '#'; colorClass = 'text-purple-400 bg-purple-500/20'; }

                            return (
                                <div
                                    key={item.id}
                                    className="px-3 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors"
                                    onMouseDown={(e) => {
                                        e.preventDefault(); // Prevent blur
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

                <div className="absolute inset-0 bg-zinc-800 rounded-xl transition-colors group-focus-within:bg-zinc-700 border border-zinc-700 shadow-sm group-focus-within:ring-1 group-focus-within:ring-zinc-600"></div>

                <div className="relative flex items-center w-full px-3 py-1.5 h-[46px]">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={badge ? "Add a new task..." : "Search, filter or add a new task ..."}
                        className="bg-transparent text-zinc-100 placeholder-zinc-500 text-sm outline-none flex-1 min-w-0 font-medium h-full"
                        value={searchValue}
                        onChange={handleInput}
                        // Note: handleInput calls onSearch
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (showSuggestions && suggestions.length > 0) {
                                    onQuickAdd(searchValue);
                                } else {
                                    onQuickAdd(searchValue);
                                }
                                setShowSuggestions(false);
                            }
                            if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
                                e.preventDefault();
                                applySuggestion(suggestions[0]);
                            }
                        }}
                        onBlur={() => {
                            // Delay hiding to allow click
                            setTimeout(() => setShowSuggestions(false), 200);
                        }}
                    />

                    {/* Filter Badge */}
                    {badge && (
                        <button
                            onClick={onClearFilter}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono border ml-2 whitespace-nowrap select-none hover:opacity-80 transition-opacity ${badge.className}`}
                            title="Clear filter"
                        >
                            {badge.text}
                            <span className="ml-1 opacity-60 hover:opacity-100">×</span>
                        </button>
                    )}

                    {/* Calendar Picker Trigger */}
                    <label className="cursor-pointer text-zinc-500 hover:text-zinc-300 p-1.5 transition-colors ml-1 shrink-0" title="Pick due date">
                        <input
                            type="date"
                            className="sr-only"
                            onChange={(e) => {
                                if (e.target.value) {
                                    applySuggestion({ type: 'date', value: e.target.value });
                                }
                            }}
                        />
                        📅
                    </label>

                    {searchValue && (
                        <>
                            <button
                                onClick={() => onSearch('')}
                                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors ml-1 shrink-0"
                                title="Clear search"
                            >
                                <span className="text-lg">×</span>
                            </button>
                            <button
                                onClick={() => onQuickAdd(searchValue)}
                                className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors ml-1 shrink-0"
                            >
                                <span className="text-xs font-bold">↵</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Right Controls Container */}
            <div className="flex gap-2 shrink-0">
                {/* Settings Button */}
                <button
                    className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors"
                    onClick={onSettingsClick}
                    title="Settings"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.09 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6 3.6z"></path>
                    </svg>
                </button>

                {/* Menu Button */}
                <button
                    className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors"
                    onClick={onMenuClick}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                        <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}
