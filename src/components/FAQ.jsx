import React from 'react';

export function FAQ({ onBack }) {
    return (
        <div className="w-full text-zinc-300 space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-20 pt-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Help Center</h2>
                    <p className="text-zinc-500 text-sm mt-1">Master your tasks with todotext.de</p>
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-sm font-medium rounded-lg transition-all border border-zinc-700/50"
                >
                    &larr; Back
                </button>
            </div>

            {/* 1. Quick Start / Syntax Guide */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">⚡</span>
                    Quick Start Guide
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                    todotext.de uses the powerful <strong>todo.txt</strong> format. It's plain text, but with special symbols to organize your life.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Syntax Cards */}
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded text-sm font-bold border border-red-500/20">(A)</span>
                            <h4 className="text-lg font-semibold text-white">Priority</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Use (A) through (Z) at the start of a task to set importance.</p>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block">
                            (A) Call Mom later
                        </code>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-sm font-bold border border-blue-500/20">+Project</span>
                            <h4 className="text-lg font-semibold text-white">Projects</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Group tasks by goal or project using the <code>+</code> symbol.</p>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block">
                            Write code +WebsiteRedesign
                        </code>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-sm font-bold border border-emerald-500/20">@Context</span>
                            <h4 className="text-lg font-semibold text-white">Contexts</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Define <em>where</em> or <em>how</em> a task is done using <code>@</code>.</p>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block">
                            Buy milk @Supermarket
                        </code>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-orange-500/10 text-orange-400 px-2 py-1 rounded text-sm font-bold border border-orange-500/20">due:YYYY-MM-DD</span>
                            <h4 className="text-lg font-semibold text-white">Due Dates</h4>
                        </div>
                        <p className="text-sm text-zinc-400 mb-2">Set deadlines with standard ISO dates.</p>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-zinc-500 block">
                            Tax return due:2024-05-31
                        </code>
                    </div>
                </div>
            </section>

            <hr className="border-zinc-800" />

            {/* 2. Key Features */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">🚀</span>
                    Power Features
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">☁️</div>
                        <h4 className="font-bold text-white mb-1">Cloud Sync</h4>
                        <p className="text-xs text-zinc-500">
                            Connect Dropbox or Google Drive to sync your `todo.txt` file across devices. Your data remains yours.
                        </p>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">📶</div>
                        <h4 className="font-bold text-white mb-1">Offline First</h4>
                        <p className="text-xs text-zinc-500">
                            No internet? No problem. Use the app offline. It syncs automatically when you're back online.
                        </p>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                        <div className="text-2xl mb-2">📱</div>
                        <h4 className="font-bold text-white mb-1">Install App</h4>
                        <p className="text-xs text-zinc-500">
                            Install as a PWA on iOS or Android for a native app experience. Look for "Add to Home Screen".
                        </p>
                    </div>
                </div>
            </section>

            <hr className="border-zinc-800" />

            {/* 3. Filtering & Sorting */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">🔍</span>
                    Find Your Focus
                </h3>
                <div className="space-y-4">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Navigate your tasks quickly with powerful filtering and sorting options.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Filtering */}
                        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5">
                            <h4 className="text-lg font-bold text-white mb-2">Filtering</h4>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li>• Tap tags (e.g., <span className="text-blue-400">+Project</span>) in the task list to filter instantly.</li>
                                <li>• Use the <strong>Filter Bar</strong> (top right) to drill down by priority, date, or context.</li>
                                <li>• Type in the search bar to filter by text or syntax (e.g. <code>prio:A</code>).</li>
                            </ul>
                        </div>

                        {/* Sorting */}
                        <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5">
                            <h4 className="text-lg font-bold text-white mb-2">Sorting</h4>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li>• Click the <strong>Sort Icon</strong> (top right) to toggle between:</li>
                                <li className="pl-4 text-zinc-500 text-xs">A-Z (Priority) &rarr; Creation Date &rarr; Due Date</li>
                                <li>• Click again to reverse the order (Ascending/Descending).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="border-zinc-800" />

            {/* 4. Workflows */}
            <section className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-4xl">🧠</span>
                    Workflows
                </h3>

                <div className="space-y-6">
                    {/* GTD */}
                    <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">Getting Things Done (GTD)</h4>
                        <p className="text-zinc-400 text-sm mb-4">
                            Capture everything in your <strong>Inbox</strong> (no project/context). Then process it:
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-sm text-zinc-300">
                            <li><strong>Clarify:</strong> Add details. Is it actionable?</li>
                            <li><strong>Organize:</strong> Assign a <code>+Project</code> or <code>@Context</code>.</li>
                            <li><strong>Review:</strong> Check your lists daily.</li>
                        </ol>
                    </div>

                    {/* Eisenhower */}
                    <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6">
                        <h4 className="text-xl font-bold text-white mb-2">Eisenhower Matrix</h4>
                        <p className="text-zinc-400 text-sm mb-4">
                            Use priorities to distinguish urgent from important:
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex gap-2"><span className="text-red-400 font-bold">(A)</span> <span className="text-zinc-300">Urgent & Important (Do now)</span></li>
                            <li className="flex gap-2"><span className="text-orange-400 font-bold">(B)</span> <span className="text-zinc-300">Important, not Urgent (Schedule)</span></li>
                            <li className="flex gap-2"><span className="text-blue-400 font-bold">(C)</span> <span className="text-zinc-300">Urgent, not Important (Delegate)</span></li>
                            <li className="flex gap-2"><span className="text-zinc-500 font-bold">(D)</span> <span className="text-zinc-300">Neither (Eliminate)</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <hr className="border-zinc-800" />

            {/* 5. Shortcuts */}
            <section className="space-y-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-blue-500">⌨️</span> Keyboard Shortcuts
                </h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden p-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {[
                        { label: 'New Task', keys: ['N'] },
                        { label: 'Focus Search', keys: ['/'] },
                        { label: 'Edit Task', keys: ['Enter'] },
                        { label: 'Complete Task', keys: ['x', 'Space'] },
                        { label: 'Delete Task', keys: ['Del'] },
                        { label: 'Move Selection', keys: ['↑', '↓'] },
                        { label: 'Change Priority', keys: ['←', '→'] },
                        { label: 'Select Range', keys: ['Shift', '↑/↓'] },
                        { label: 'Select/Deselect', keys: ['Shift', '→/←'] },
                        { label: 'Multi-Line', keys: ['Shift', 'Enter'] },
                        { label: 'Undo', keys: ['⌘', 'Z'] },
                        { label: 'Redo', keys: ['⌘', '⇧', 'Z'] },
                        { label: 'Close Modal', keys: ['Esc'] },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-1 border-b border-zinc-800/30 last:border-0 sm:last:border-0 sm:even:border-b-0">
                            <span className="text-sm text-zinc-400">{item.label}</span>
                            <div className="flex gap-1">
                                {item.keys.map(k => (
                                    <kbd key={k} className="min-w-[24px] text-center px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-mono text-zinc-300 shadow-sm">
                                        {k}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
