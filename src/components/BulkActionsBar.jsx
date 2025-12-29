import React from 'react';

export function BulkActionsBar({ selectedCount, onDeselectAll, onCompleteAll, onDeleteAll }) {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 md:left-[305px] bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 p-4 flex items-center justify-between shadow-lg z-30 transition-all transform translate-y-0">
            <div className="flex items-center gap-4">
                <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{selectedCount} selected</span>
                <button onClick={onDeselectAll} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Cancel
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onCompleteAll}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-md text-sm font-medium transition-colors"
                >
                    Complete
                </button>
                <button
                    onClick={onDeleteAll}
                    className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
