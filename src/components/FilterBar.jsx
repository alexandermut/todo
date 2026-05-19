import React, { useState } from 'react';

export function FilterBar({ projects, contexts, tags, onFilterSelect, activeFilter, openCategory, onClose }) {
    const getItems = (category) => {
        if (category === 'project') return projects || [];
        if (category === 'context') return contexts || [];
        if (category === 'tag') return tags || [];
        if (category === 'priority') return ['A', 'B', 'C'];
        if (category === 'alpha') return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
        // Dates could be generated: "Today", "Tomorrow", "Next Week" or extracted from tasks
        // For now, let's offer standard time buckets
        if (category === 'date') return ['Today', 'Tomorrow', 'Overdue', 'Upcoming'];
        return [];
    };

    const handleItemClick = (category, item) => {
        if (category === 'date') {
            // Map friendly names to actual filter values if needed, or rely on App.jsx handling
            // App.jsx supports 'today', 'upcoming', 'overdue' already as types.
            const typeMap = {
                'Today': 'today',
                'Tomorrow': 'tomorrow', // Need to implement tomorrow if not exists, or pass specific date
                'Overdue': 'overdue',
                'Upcoming': 'upcoming'
            };
            onFilterSelect({ type: typeMap[item] || 'date', value: item });
        } else {
            onFilterSelect({ type: category, value: item });
        }
        if (onClose) onClose();
    };

    if (!openCategory) return null;

    return (
        <div className="flex flex-col bg-zinc-950 border-b border-zinc-900">
            {/* Expandable Panel */}
            <div className="px-4 py-3 bg-zinc-900/30 border-t border-zinc-900 animate-in slide-in-from-top-2 duration-200">
                {openCategory === 'alpha' ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                            {getItems('alpha').slice(0, 13).map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleItemClick(openCategory, item)}
                                    className={`px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors min-w-[28px] sm:min-w-[32px]
                                        ${activeFilter?.type === openCategory && activeFilter?.value === item
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                            {getItems('alpha').slice(13, 26).map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleItemClick(openCategory, item)}
                                    className={`px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors min-w-[28px] sm:min-w-[32px]
                                        ${activeFilter?.type === openCategory && activeFilter?.value === item
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {getItems(openCategory).length === 0 ? (
                            <div className="text-zinc-600 text-xs italic px-2">No items found</div>
                        ) : (
                            getItems(openCategory).map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleItemClick(openCategory, item)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                                        ${activeFilter?.type === openCategory && activeFilter?.value === item
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
