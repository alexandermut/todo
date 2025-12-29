import React, { useState } from 'react';

export function Sidebar({ activeFilter, onFilterSelect, projects, contexts, tags = [], isOpen, onClose, onSyncClick, onPullClick, isSyncing, isAuthenticated, onDropboxSync, onDropboxPull, isDropboxAuth, isDropboxSyncing, onGTasksSync }) {
    const [projectsExpanded, setProjectsExpanded] = useState(true);
    const [contextsExpanded, setContextsExpanded] = useState(true);
    const [tagsExpanded, setTagsExpanded] = useState(true);
    const [viewsExpanded, setViewsExpanded] = useState(true);
    const [filtersExpanded, setFiltersExpanded] = useState(true);

    const isActive = (type, value) => activeFilter.type === type && (value === undefined || activeFilter.value === value);

    const navItemClass = (active) =>
        `flex items-center gap-2 px-2 py-1.5 rounded text-sm font-medium w-full text-left transition-colors ${active ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800'}`;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                ></div>
            )}

            <aside className={`
            w-[305px] bg-zinc-900 flex flex-col border-l border-zinc-800 pt-8 pl-8 pr-4 shrink-0 overflow-y-auto
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0 shadow-xl' : 'translate-x-full'}
            bg-zinc-900 text-zinc-300
        `}>
                <nav className="space-y-1 mb-8">
                    <button
                        onClick={() => { onFilterSelect({ type: 'inbox' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'inbox')}
                    >
                        <span className="text-blue-500 text-lg leading-none">📥</span> Inbox
                    </button>
                    <button
                        onClick={() => { onFilterSelect({ type: 'today' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'today')}
                    >
                        <span className="text-green-500 text-lg leading-none">📅</span> Today
                    </button>
                    <button
                        onClick={() => { onFilterSelect({ type: 'upcoming' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'upcoming')}
                    >
                        <span className="text-purple-500 text-lg leading-none">🗓</span> Upcoming
                    </button>
                    <button
                        onClick={() => { onFilterSelect({ type: 'overdue' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'overdue')}
                    >
                        <span className="text-red-500 text-lg leading-none">⚠️</span> Overdue
                    </button>
                </nav>

                {/* Views */}
                <div onClick={() => setViewsExpanded(!viewsExpanded)} className="flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider">
                    <span>Views</span>
                    <span>{viewsExpanded ? '▼' : '▶'}</span>
                </div>
                {viewsExpanded && (
                    <div className="mt-1 space-y-0.5">
                        <div onClick={() => onFilterSelect({ type: 'view', value: 'all' })} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${isActive('view', 'all') ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                            <span>📑</span> All
                        </div>
                        <div onClick={() => onFilterSelect({ type: 'view', value: 'open' })} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${isActive('view', 'open') ? 'bg-emerald-100 text-emerald-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                            <span>⚡</span> Open
                        </div>
                        <div onClick={() => onFilterSelect({ type: 'view', value: 'done' })} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${isActive('view', 'done') ? 'bg-gray-200 text-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                            <span>✅</span> Done
                        </div>
                    </div>
                )}

                {/* Special Filters */}
                <div onClick={() => setFiltersExpanded(!filtersExpanded)} className="flex items-center justify-between px-2 py-1 mt-4 text-gray-500 hover:text-gray-700 cursor-pointer text-xs font-bold uppercase tracking-wider">
                    <span>Filters</span>
                    <span>{filtersExpanded ? '▼' : '▶'}</span>
                </div>
                {filtersExpanded && (
                    <div className="mt-1 space-y-0.5">
                        <div onClick={() => onFilterSelect({ type: 'filter', value: 'no-due' })} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${isActive('filter', 'no-due') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                            <span>🚫</span> No Due Date
                        </div>
                        <div onClick={() => onFilterSelect({ type: 'filter', value: 'no-project' })} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm ${isActive('filter', 'no-project') ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                            <span>📂</span> No Project
                        </div>
                    </div>
                )}

                {/* Projects */}
                <div className="mb-6">
                    <h3
                        className="flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700"
                        onClick={() => setProjectsExpanded(!projectsExpanded)}
                    >
                        <span className="flex items-center gap-1">
                            <span className={`transition-transform duration-200 ${projectsExpanded ? '' : '-rotate-90'}`}>▼</span>
                            Projects
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5" onClick={(e) => e.stopPropagation()}>+</button>
                    </h3>
                    {projectsExpanded && (
                        <div className="space-y-0.5">
                            {projects.length === 0 && <div className="px-2 text-xs text-gray-400 italic">No projects yet</div>}
                            {projects.map(proj => (
                                <button
                                    key={proj}
                                    onClick={() => { onFilterSelect({ type: 'project', value: proj }); if (onClose) onClose(); }}
                                    className={navItemClass(activeFilter.type === 'project' && activeFilter.value === proj)}
                                >
                                    <span className="text-gray-400 text-xs">●</span>
                                    {proj}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contexts */}
                <div className="mb-6">
                    <h3
                        className="flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700"
                        onClick={() => setContextsExpanded(!contextsExpanded)}
                    >
                        <span className="flex items-center gap-1">
                            <span className={`transition-transform duration-200 ${contextsExpanded ? '' : '-rotate-90'}`}>▼</span>
                            Contexts
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5" onClick={(e) => e.stopPropagation()}>+</button>
                    </h3>
                    {contextsExpanded && (
                        <div className="space-y-0.5">
                            {contexts.length === 0 && <div className="px-2 text-xs text-gray-400 italic">No contexts yet</div>}
                            {contexts.map(ctx => (
                                <button
                                    key={ctx}
                                    onClick={() => { onFilterSelect({ type: 'context', value: ctx }); if (onClose) onClose(); }}
                                    className={navItemClass(activeFilter.type === 'context' && activeFilter.value === ctx)}
                                >
                                    <span className="text-gray-400 text-lg leading-none">@</span>
                                    {ctx}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <h3
                        className="flex items-center justify-between text-gray-500 font-bold text-xs px-2 mb-2 group cursor-pointer hover:text-gray-700"
                        onClick={() => setTagsExpanded(!tagsExpanded)}
                    >
                        <span className="flex items-center gap-1">
                            <span className={`transition-transform duration-200 ${tagsExpanded ? '' : '-rotate-90'}`}>▼</span>
                            Tags
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded p-0.5" onClick={(e) => e.stopPropagation()}>+</button>
                    </h3>
                    {tagsExpanded && (
                        <div className="space-y-0.5">
                            {tags.length === 0 && <div className="px-2 text-xs text-gray-400 italic">No tags yet</div>}
                            {tags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => { onFilterSelect({ type: 'tag', value: tag }); if (onClose) onClose(); }}
                                    className={navItemClass(activeFilter.type === 'tag' && activeFilter.value === tag)}
                                >
                                    <span className="text-gray-400 text-xs">#</span>
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>


                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex flex-col space-y-2 px-2 pb-4">
                        <button
                            onClick={() => { onFilterSelect({ type: 'impressum' }); if (onClose) onClose(); }}
                            className={`text-sm text-left transition-colors ${activeFilter.type === 'impressum' ? 'text-zinc-100 font-medium' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                        >
                            Impressum
                        </button>
                        <button
                            onClick={() => { onFilterSelect({ type: 'datenschutz' }); if (onClose) onClose(); }}
                            className={`text-sm text-left transition-colors ${activeFilter.type === 'datenschutz' ? 'text-zinc-100 font-medium' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                        >
                            Datenschutz
                        </button>
                    </div>
                </div>

                {/* Close Button - Bottom Right */}
                <button
                    onClick={onClose}
                    className="absolute bottom-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Close sidebar"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </aside>
        </>
    );
}
