import React, { useRef, useEffect } from 'react';

export function BottomSearch({ searchValue, onSearch, onQuickAdd, onMenuClick, onSettingsClick, focusTrigger, activeFilter, onClearFilter }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (focusTrigger > 0 && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(0, 0);
        }
    }, [focusTrigger]);

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
                <div className="absolute inset-0 bg-zinc-800 rounded-xl transition-colors group-focus-within:bg-zinc-700 border border-zinc-700 shadow-sm group-focus-within:ring-1 group-focus-within:ring-zinc-600"></div>

                <div className="relative flex items-center w-full px-3 py-1.5 h-[46px]">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={badge ? "Add a new task..." : "Search, filter or add a new task ..."}
                        className="bg-transparent text-zinc-100 placeholder-zinc-500 text-sm outline-none flex-1 min-w-0 font-medium h-full"
                        value={searchValue}
                        onChange={(e) => onSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onQuickAdd(searchValue);
                            }
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

                    {searchValue && (
                        <>
                            <button
                                onClick={() => onSearch('')}
                                className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors ml-2 shrink-0"
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
                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.09 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
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
