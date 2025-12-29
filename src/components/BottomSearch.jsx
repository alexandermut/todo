import React, { useRef, useEffect } from 'react';

export function BottomSearch({ searchValue, onSearch, onQuickAdd, onMenuClick, onSettingsClick, focusTrigger }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (focusTrigger > 0 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focusTrigger]);

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 z-40 flex items-center gap-3">
            {/* Settings Button (Left) */}
            <button
                className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors shrink-0"
                onClick={onSettingsClick}
                title="Settings"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.09 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
                </svg>
            </button>

            {/* Search / Add Input */}
            <div className="relative flex-1">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search, filter or add a new task ..."
                    className="w-full bg-zinc-800 text-zinc-100 placeholder-zinc-500 rounded-xl px-4 py-3 text-sm outline-none focus:bg-zinc-700 focus:ring-1 focus:ring-zinc-600 transition-all font-medium border border-zinc-700 shadow-sm"
                    value={searchValue}
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onQuickAdd(searchValue);
                        }
                    }}
                />
                {searchValue && (
                    <button
                        onClick={() => onQuickAdd(searchValue)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                    >
                        <span className="text-xs font-bold">↵</span>
                    </button>
                )}
            </div>

            {/* Menu Button (Right) */}
            <button
                className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-xl transition-colors shrink-0"
                onClick={onMenuClick}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path>
                </svg>
            </button>
        </div>
    );
}
