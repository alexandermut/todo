import React from 'react';

export function BulkActionsBar({ selectedCount, onDeselectAll, onCompleteAll, onDeleteAll, onOpenBatchEdit }) {
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
        <div className="w-full bg-zinc-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 py-1 px-4 flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{selectedCount} selected</span>
                <button onClick={onDeselectAll} className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" title="Cancel Selection">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="flex items-center gap-2">
                {/* Batch Edit */}
                <button
                    onClick={onOpenBatchEdit}
                    className="px-3 py-1.5 flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 rounded-lg transition-colors font-semibold text-sm"
                    title="Batch Edit Projects, Tags, etc."
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Batch Edit
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
        </div>
    );
}
