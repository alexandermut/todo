import React, { useRef, useEffect, useState } from 'react';
import { get_completions } from 'todo-parser';

export function BottomSearch({ searchValue, onSearch, onQuickAdd, onMenuClick, onSettingsClick, focusTrigger, activeFilter, onClearFilter, projects, contexts, tags, onOpenCalendar }) {
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
        onSearch(val); // Propagate up for filtering

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

    const applySuggestion = (item, dateValue = null) => {
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
        if (item.type === 'date') insertion = `due:${dateValue || item.value}`;
        else if (item.type === 'project') insertion = `+${item.value}`;
        else if (item.type === 'context') insertion = `@${item.value}`;
        else if (item.type === 'tag') insertion = `#${item.value}`;
        else insertion = item.value;

        const newVal = prefix + insertion + suffix;

        onSearch(newVal);
        inputRef.current.value = newVal;

        const newCursorPos = prefix.length + insertion.length;
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);

        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            {/* Suggestions Overlay */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                    <div className="px-3 py-2 text-xs font-semibold text-zinc-500 border-b border-zinc-800">
                        Suggestions
                    </div>
                    {suggestions.map((item, idx) => (
                        <div
                            key={idx}
                            className="px-3 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3"
                            onClick={() => applySuggestion(item)}
                        >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold 
                                ${item.type === 'date' ? 'text-red-400 bg-red-500/20' :
                                    item.type === 'project' ? 'text-cyan-400 bg-cyan-500/20' :
                                        item.type === 'context' ? 'text-emerald-400 bg-emerald-500/20' :
                                            'text-purple-400 bg-purple-500/20'}`}>
                                {item.type === 'date' ? '📅' : item.type === 'project' ? '+' : item.type === 'context' ? '@' : '#'}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-zinc-200">{item.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-2xl mx-auto px-4 py-3 bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800">
                <div className="flex items-center gap-2 bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700/50 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600 transition-all shadow-lg">
                    <span className="text-zinc-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchValue}
                        onChange={handleInput}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (showSuggestions && suggestions.length > 0) {
                                    e.preventDefault();
                                    applySuggestion(suggestions[0]);
                                } else {
                                    e.preventDefault();
                                    onQuickAdd(searchValue);
                                }
                            }
                        }}
                        placeholder={activeFilter && activeFilter.type !== 'inbox' ? `Add to ${activeFilter.value}...` : "Search, filter or add a new task ..."}
                        className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-500 text-sm h-8"
                    />

                    {/* Clear Filter Badge */}
                    {activeFilter && activeFilter.type !== 'inbox' && (
                        <button
                            onClick={onClearFilter}
                            className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full hover:bg-blue-500/30 flex items-center gap-1"
                        >
                            {activeFilter.type}:{activeFilter.value} <span className="font-bold">×</span>
                        </button>
                    )}

                    {/* Quick Calendar Trigger */}
                    <button
                        onClick={() => {
                            if (onOpenCalendar) {
                                onOpenCalendar((dateStr) => {
                                    applySuggestion({ type: 'date', value: dateStr }, dateStr);
                                });
                            }
                        }}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                        title="Pick Date"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>

                    <div className="w-px h-4 bg-zinc-700 mx-1"></div>

                    <button onClick={onSettingsClick} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </button>

                    <button onClick={onMenuClick} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
