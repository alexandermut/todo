import React, { useState } from 'react';

export function BulkActionsBar({ selectedCount, onDeselectAll, onCompleteAll, onDeleteAll, onSetPriority, onSetDate, onBulkAdd }) {
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addValue, setAddValue] = useState('');

    if (selectedCount === 0) return null;

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (addValue.trim()) {
            onBulkAdd(addValue.trim());
            setAddValue('');
            setIsAdding(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 md:left-[305px] bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 py-2 px-4 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30 transition-all transform translate-y-0">
            {isAdding ? (
                <form onSubmit={handleAddSubmit} className="flex-1 flex items-center gap-2">
                    <input
                        type="text"
                        value={addValue}
                        onChange={(e) => setAddValue(e.target.value)}
                        placeholder="Add +project / @context / #tag or remove -+project / -@context / -#tag"
                        className="flex-1 bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setIsAdding(false);
                                setAddValue('');
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="p-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    >
                        ✕
                    </button>
                </form>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{selectedCount} selected</span>
                        <button onClick={onDeselectAll} className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" title="Cancel Selection">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Add Attribute */}
                        <button
                            onClick={() => setIsAdding(true)}
                            className="p-2 text-zinc-500 hover:text-purple-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                            title="Add Project, Context, or Tag"
                        >
                            <span className="font-bold text-lg leading-none">+</span>
                        </button>

                        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1"></div>

                        {/* Priority Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                                className="p-2 text-zinc-500 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-600"
                                title="Set Priority"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
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
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </button>

                        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700 mx-1"></div>

                        <button
                            onClick={onCompleteAll}
                            className="p-2 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors"
                            title="Complete Selected"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </button>
                        <button
                            onClick={onDeleteAll}
                            className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Delete Selected"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
