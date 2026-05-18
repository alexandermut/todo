import React, { useState, useMemo } from 'react';

// --- Icons ---
const InboxIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const TodayIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
    </svg>
);

const UpcomingIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const OverdueIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const ChevronDown = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ViewIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const FilterIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);


export function Sidebar({ activeFilter, onFilterSelect, projects, contexts, tags = [], tasks = [], isOpen, onClose, onSyncClick, onPullClick, isSyncing, isAuthenticated, onDropboxSync, onDropboxPull, isDropboxAuth, isDropboxSyncing, onGTasksSync, onPageNavigate, onManageMetadata, onRenameMetadata }) {
    const [projectsExpanded, setProjectsExpanded] = useState(true);
    const [contextsExpanded, setContextsExpanded] = useState(true);
    const [tagsExpanded, setTagsExpanded] = useState(true);
    const [viewsExpanded, setViewsExpanded] = useState(true);
    const [filtersExpanded, setFiltersExpanded] = useState(true);

    const isActive = (type, value) => activeFilter.type === type && (value === undefined || activeFilter.value === value);

    // Stats
    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        let open = 0, doneToday = 0, dueToday = 0, overdue = 0;
        tasks.forEach(t => {
            if (t.completed) {
                if (t.completionDate === today) doneToday++;
            } else {
                open++;
                if (t.metadata && t.metadata.due) {
                    if (t.metadata.due === today) dueToday++;
                    else if (t.metadata.due < today) overdue++;
                }
            }
        });
        return { open, doneToday, dueToday, overdue };
    }, [tasks]);

    const navItemClass = (active) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 ${active
            ? 'bg-zinc-800/80 text-white shadow-sm border border-zinc-700/50'
            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'
        }`;

    const EditableSidebarItem = ({ type, value, active, onClick, prefixLabel, dotColor }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [editValue, setEditValue] = useState(value);

        const handleSave = () => {
            if (editValue.trim() !== value) {
                if (onRenameMetadata) onRenameMetadata(type, value, editValue.trim());
            }
            setIsEditing(false);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
                setEditValue(value);
                setIsEditing(false);
            }
        };

        if (isEditing) {
            return (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/50 w-full mb-0.5 shadow-inner">
                    {prefixLabel && <span className="text-zinc-500 text-xs font-mono">{prefixLabel}</span>}
                    {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>}
                    <input
                        autoFocus
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSave}
                        className="flex-1 bg-transparent border-none p-0 text-sm text-zinc-200 focus:ring-0"
                    />
                </div>
            );
        }

        return (
            <div className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium w-full text-left transition-all duration-200 mb-0.5 cursor-pointer ${active ? 'bg-zinc-800/80 text-white shadow-sm border border-zinc-700/50' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent'}`} onClick={onClick}>
                <div className="flex items-center gap-3 truncate">
                    {prefixLabel && <span className="text-zinc-500 text-xs font-mono">{prefixLabel}</span>}
                    {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>}
                    <span className="truncate">{value}</span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsEditing(true); setEditValue(value); }}
                        className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-colors"
                        title="Rename"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete ${type} "${value}" from all tasks?`)) {
                                if (onRenameMetadata) onRenameMetadata(type, value, '');
                            }
                        }}
                        className="p-1 hover:bg-red-500/20 rounded text-zinc-400 hover:text-red-400 transition-colors"
                        title="Delete everywhere"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    const SectionHeader = ({ label, expanded, onToggle, onAdd }) => (
        <div
            onClick={onToggle}
            className="flex items-center justify-between px-3 py-2 mt-6 text-zinc-500 hover:text-zinc-300 cursor-pointer group transition-colors"
        >
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold">{label}</span>
            <div className="flex items-center gap-2">
                {onAdd && (
                    <button
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-zinc-800 rounded transition-all"
                        onClick={(e) => { e.stopPropagation(); onAdd(); }}
                    >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                )}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? '' : '-rotate-90'}`} />
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`
            w-[280px] bg-zinc-950/95 backdrop-blur-xl flex flex-col border-l border-zinc-800/50 pt-6 px-3 shrink-0 overflow-y-auto no-scrollbar
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : 'translate-x-full'}
            font-sans
        `}>
                {/* Logo Area */}
                <div className="mb-8 px-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-default">
                        <div className="w-8 h-8 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center">
                            <span className="text-lg">☑️</span>
                        </div>
                        <span className="font-bold text-zinc-200 tracking-tight">todotext</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-full transition-all"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <nav className="space-y-1 mb-4">
                    <button
                        onClick={() => { onFilterSelect({ type: 'inbox' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'inbox')}
                    >
                        <InboxIcon className={`w-4 h-4 ${activeFilter.type === 'inbox' ? 'text-blue-500' : 'text-zinc-500'}`} />
                        Inbox
                    </button>
                    <button
                        onClick={() => { onFilterSelect({ type: 'today' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'today')}
                    >
                        <TodayIcon className={`w-4 h-4 ${activeFilter.type === 'today' ? 'text-green-500' : 'text-zinc-500'}`} />
                        Today
                    </button>
                    <button
                        onClick={() => { onFilterSelect({ type: 'upcoming' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'upcoming')}
                    >
                        <UpcomingIcon className={`w-4 h-4 ${activeFilter.type === 'upcoming' ? 'text-purple-500' : 'text-zinc-500'}`} />
                        Upcoming
                    </button>
                    <button
                        onClick={() => { onFilterSelect({ type: 'overdue' }); if (onClose) onClose(); }}
                        className={navItemClass(activeFilter.type === 'overdue')}
                    >
                        <OverdueIcon className={`w-4 h-4 ${activeFilter.type === 'overdue' ? 'text-red-500' : 'text-zinc-500'}`} />
                        Overdue
                    </button>
                </nav>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 px-1 mb-4">
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg px-3 py-2 text-center">
                        <div className="text-lg font-bold text-zinc-200">{stats.open}</div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">Offen</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg px-3 py-2 text-center">
                        <div className="text-lg font-bold text-yellow-400">{stats.dueToday}</div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">Heute fällig</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg px-3 py-2 text-center">
                        <div className="text-lg font-bold text-red-400">{stats.overdue}</div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">Überfällig</div>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg px-3 py-2 text-center">
                        <div className="text-lg font-bold text-emerald-400">{stats.doneToday}</div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500">Heute erledigt</div>
                    </div>
                </div>

                {/* Views */}
                <SectionHeader label="Views" expanded={viewsExpanded} onToggle={() => setViewsExpanded(!viewsExpanded)} />
                {viewsExpanded && (
                    <div className="space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200">
                        <button onClick={() => onFilterSelect({ type: 'view', value: 'all' })} className={navItemClass(isActive('view', 'all'))}>
                            <ViewIcon className="w-4 h-4 text-zinc-500" />
                            All Tasks
                        </button>
                        <button onClick={() => onFilterSelect({ type: 'view', value: 'open' })} className={navItemClass(isActive('view', 'open'))}>
                            <div className="w-4 h-4 rounded-full border-2 border-zinc-600 border-dashed" />
                            Open
                        </button>
                        <button onClick={() => onFilterSelect({ type: 'view', value: 'done' })} className={navItemClass(isActive('view', 'done'))}>
                            <div className="w-4 h-4 flex items-center justify-center">
                                <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            Completed
                        </button>
                    </div>
                )}

                {/* Filters */}
                <SectionHeader label="Filters" expanded={filtersExpanded} onToggle={() => setFiltersExpanded(!filtersExpanded)} />
                {filtersExpanded && (
                    <div className="space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200">
                        <button onClick={() => onFilterSelect({ type: 'filter', value: 'no-time' })} className={navItemClass(isActive('filter', 'no-time'))}>
                            <span className="w-4 flex justify-center text-[10px] font-mono text-zinc-500">🚫</span>
                            No Due Date
                        </button>
                        <button onClick={() => onFilterSelect({ type: 'filter', value: 'no-project' })} className={navItemClass(isActive('filter', 'no-project'))}>
                            <span className="w-4 flex justify-center text-[10px] font-mono text-zinc-500">📂</span>
                            No Project
                        </button>
                    </div>
                )}

                {/* Projects */}
                <SectionHeader label="Projects" expanded={projectsExpanded} onToggle={() => setProjectsExpanded(!projectsExpanded)} />
                {projectsExpanded && (
                    <div className="space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200">
                        {projects.length === 0 && <div className="px-3 py-2 text-xs text-zinc-600 italic">No projects yet</div>}
                        {projects.map(proj => (
                            <EditableSidebarItem
                                key={proj}
                                type="project"
                                value={proj}
                                dotColor={activeFilter.type === 'project' && activeFilter.value === proj ? 'bg-purple-500' : 'bg-zinc-700'}
                                active={activeFilter.type === 'project' && activeFilter.value === proj}
                                onClick={() => { onFilterSelect({ type: 'project', value: proj }); if (onClose) onClose(); }}
                            />
                        ))}
                    </div>
                )}

                {/* Contexts */}
                <SectionHeader label="Contexts" expanded={contextsExpanded} onToggle={() => setContextsExpanded(!contextsExpanded)} />
                {contextsExpanded && (
                    <div className="space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200">
                        {contexts.length === 0 && <div className="px-3 py-2 text-xs text-zinc-600 italic">No contexts yet</div>}
                        {contexts.map(ctx => (
                            <EditableSidebarItem
                                key={ctx}
                                type="context"
                                value={ctx}
                                prefixLabel="@"
                                active={activeFilter.type === 'context' && activeFilter.value === ctx}
                                onClick={() => { onFilterSelect({ type: 'context', value: ctx }); if (onClose) onClose(); }}
                            />
                        ))}
                    </div>
                )}

                {/* Tags */}
                <SectionHeader label="Tags" expanded={tagsExpanded} onToggle={() => setTagsExpanded(!tagsExpanded)} />
                {tagsExpanded && (
                    <div className="space-y-0.5 animate-in slide-in-from-top-1 fade-in duration-200">
                        {tags.length === 0 && <div className="px-3 py-2 text-xs text-zinc-600 italic">No tags yet</div>}
                        {tags.map(tag => (
                            <EditableSidebarItem
                                key={tag}
                                type="tag"
                                value={tag}
                                prefixLabel="#"
                                active={activeFilter.type === 'tag' && activeFilter.value === tag}
                                onClick={() => { onFilterSelect({ type: 'tag', value: tag }); if (onClose) onClose(); }}
                            />
                        ))}
                    </div>
                )}


                {/* Footer */}
                <div className="mt-auto px-1 pb-4 pt-6">
                    <div className="space-y-1 pt-4 border-t border-zinc-800/50">
                        <button
                            onClick={() => { if (onManageMetadata) onManageMetadata(); if (onClose) onClose(); }}
                            className="w-full text-xs text-left px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors flex items-center gap-2 group"
                        >
                            <svg className="w-4 h-4 text-zinc-500 group-hover:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Manage Metadata
                        </button>
                        <button
                            onClick={() => { if (onPageNavigate) onPageNavigate('faq'); if (onClose) onClose(); }}
                            className="w-full text-xs text-left px-3 py-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors flex items-center gap-2 group"
                        >
                            <span className="w-4 h-4 flex items-center justify-center bg-zinc-900 rounded border border-zinc-800 group-hover:border-zinc-700 text-[10px]">?</span>
                            Help & FAQ
                        </button>
                        <a
                            href="/impressum.html"
                            className="block w-full text-xs text-left px-3 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors"
                        >
                            Impressum
                        </a>
                        <a
                            href="/datenschutz.html"
                            className="block w-full text-xs text-left px-3 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors"
                        >
                            Datenschutz
                        </a>
                    </div>
                </div>


            </aside>
        </>
    );
}
