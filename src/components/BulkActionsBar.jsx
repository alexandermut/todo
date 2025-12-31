import React, { useState } from 'react';

export function BulkActionsBar({ selectedCount, onDeselectAll, onCompleteAll, onDeleteAll, onSetPriority, onSetDate }) {
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);

    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 md:left-[305px] bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 p-4 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30 transition-all transform translate-y-0">
            <div className="flex items-center gap-4">
                <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{selectedCount} selected</span>
                <button onClick={onDeselectAll} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Cancel
                </button>
            </div>

            <div className="flex items-center gap-2">
                {/* Priority Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                        className="p-2 text-zinc-500 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                        title="Set Priority"
                    >
                        <span className="font-bold text-sm">(!)</span>
                    </button>
                    {showPriorityMenu && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-xl p-1 flex flex-col gap-1 min-w-[40px]">
                            {['A', 'B', 'C'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => { onSetPriority(p); setShowPriorityMenu(false); }}
                                    className="px-3 py-1.5 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-amber-500"
                                >
                                    {p}
                                </button>
                            ))}
                            <div className="h-px bg-zinc-200 dark:bg-zinc-700 my-0.5"></div>
                            <button
                                onClick={() => { onSetPriority(null); setShowPriorityMenu(false); }}
                                className="px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
                            >
                                None
                            </button>
                        </div>
                    )}
                </div>

                {/* Due Date */}
                <button
                    onClick={onSetDate}
                    className="p-2 text-zinc-500 hover:text-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                    title="Set Due Date"
                >
                    📅
                </button>

                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1"></div>

                <button
                    onClick={onCompleteAll}
                    className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded-md text-sm font-medium transition-colors"
                >
                    Complete
                </button>
                <button
                    onClick={onDeleteAll}
                    className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                    title="Delete Selected"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
    );
}
