import React from 'react';

export function FAQ({ onBack }) {
    return (
        <div className="w-full text-zinc-300 space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold text-white">Help & FAQ</h2>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-lg transition-colors"
                >
                    &larr; Back to Tasks
                </button>
            </div>

            {/* Shortcuts Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-blue-500">⌨️</span> Keyboard Shortcuts
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden p-4 grid gap-4 sm:grid-cols-2">
                    {[
                        { label: 'New Task', keys: ['N'] },
                        { label: 'Focus Search', keys: ['/'] },
                        { label: 'Edit Task', keys: ['Enter'] },
                        { label: 'Complete Task', keys: ['x'] },
                        { label: 'Delete Task', keys: ['Del'] },
                        { label: 'Navigate List', keys: ['↑', '↓'] },
                        { label: 'Change Priority', keys: ['←', '→'] },
                        { label: 'Select Range', keys: ['Shift', '↑/↓'] },
                        { label: 'Select Single', keys: ['Shift', '→'] },
                        { label: 'Deselect Single', keys: ['Shift', '←'] },
                        { label: 'Undo', keys: ['⌘', 'Z'] },
                        { label: 'Redo', keys: ['⌘', '⇧', 'Z'] },
                        { label: 'Close Modal', keys: ['Esc'] },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-950/50 p-2 rounded-lg border border-zinc-800/50">
                            <span className="text-sm text-zinc-400">{item.label}</span>
                            <div className="flex gap-1">
                                {item.keys.map(k => (
                                    <kbd key={k} className="min-w-[24px] text-center px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-300 shadow-sm">
                                        {k}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Syntax Filter Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-purple-500">🔍</span> Search & Filtering Syntax
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden p-4 space-y-4">
                    <div className="grid gap-3">
                        <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/30">
                            <div className="flex items-center gap-3">
                                <code className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">prio:A</code>
                                <span className="text-sm text-zinc-400">Filter by Priority (A-Z)</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/30">
                            <div className="flex items-center gap-3">
                                <code className="text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">+Project</code>
                                <span className="text-sm text-zinc-400">Filter by Project (e.g. +Work)</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/30">
                            <div className="flex items-center gap-3">
                                <code className="text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">@Context</code>
                                <span className="text-sm text-zinc-400">Filter by Context (e.g. @Office)</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/30">
                            <div className="flex items-center gap-3">
                                <code className="text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">due:2024-12-31</code>
                                <span className="text-sm text-zinc-400">Filter by Due Date</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/30">
                            <div className="flex items-center gap-3">
                                <code className="text-zinc-400 bg-zinc-500/10 px-2 py-1 rounded border border-zinc-500/20">Sort:Prio</code>
                                <span className="text-sm text-zinc-400">Sort tasks by typing "sort:..."</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-zinc-500 italic px-2">
                        Tip: You can combine filters like `+Work @Home prio:A` to find exactly what you need.
                    </div>
                </div>
            </section>

            {/* Smart Add Syntax */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-emerald-500">✨</span> Smart Add & Bulk Edit (Bulk Actions)
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden p-6 text-sm text-zinc-400 space-y-4 leading-relaxed">
                    <p>
                        When adding multiple tasks or editing them in bulk, you can use special prefixes to add or remove metadata instantly:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-white">+tag</strong> : Adds the tag `+tag` to all selected tasks.
                        </li>
                        <li>
                            <strong className="text-white">-+tag</strong> : Removes the tag `+tag` from all selected tasks.
                        </li>
                        <li>
                            <strong className="text-white">@context</strong> : Adds `@context`.
                        </li>
                        <li>
                            <strong className="text-white">-@context</strong> : Removes `@context`.
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
