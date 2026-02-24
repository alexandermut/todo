import React, { useState, useEffect } from 'react';

export function BatchEditModal({ isOpen, onClose, selectedTasks, onSave, onOpenCalendar }) {
    const [priority, setPriority] = useState(''); // 'A', 'B', '', or 'MIXED'
    const [dueDate, setDueDate] = useState(''); // 'YYYY-MM-DD', '', or 'MIXED'
    const [metadata, setMetadata] = useState([]); // Array of { original: '+pro1', type: 'project', current: '+pro1' }
    const [additions, setAdditions] = useState('');

    useEffect(() => {
        if (!isOpen || !selectedTasks || selectedTasks.length === 0) return;

        let commonPriority = undefined;
        let commonDueDate = undefined;
        const uniqueMeta = new Set();

        selectedTasks.forEach(task => {
            // Priority
            const p = task.priority || '';
            if (commonPriority === undefined) {
                commonPriority = p;
            } else if (commonPriority !== p) {
                commonPriority = 'MIXED';
            }

            // Due Date
            let due = '';
            const dueMatch = task.raw.match(/\bdue:(\S+)/);
            if (dueMatch) due = dueMatch[1];

            if (commonDueDate === undefined) {
                commonDueDate = due;
            } else if (commonDueDate !== due) {
                commonDueDate = 'MIXED';
            }

            // Extract metadata (Projects +, Contexts @, Tags #)
            const tokens = task.raw.split(/\s+/);
            tokens.forEach(t => {
                if (t.startsWith('+') && t.length > 1) uniqueMeta.add(t);
                else if (t.startsWith('@') && t.length > 1) uniqueMeta.add(t);
                else if (t.startsWith('#') && t.length > 1) uniqueMeta.add(t);
            });
        });

        setPriority(commonPriority || '');
        setDueDate(commonDueDate || '');

        const metaList = Array.from(uniqueMeta).sort().map(m => {
            let type = 'tag';
            if (m.startsWith('+')) type = 'project';
            if (m.startsWith('@')) type = 'context';
            return { original: m, type, current: m };
        });

        setMetadata(metaList);
        setAdditions('');

    }, [isOpen, selectedTasks]);

    const handleSave = (e) => {
        if (e) e.preventDefault();

        const instructions = {
            priority, // 'A', 'B', '', or 'MIXED'
            dueDate,   // 'YYYY-MM-DD', '', or 'MIXED'
            renames: {},
            additions: additions.trim()
        };

        metadata.forEach(m => {
            if (m.current.trim() !== m.original) {
                instructions.renames[m.original] = m.current.trim();
            }
        });

        onSave(instructions);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                handleSave(e);
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, priority, dueDate, metadata, additions, onSave]);

    if (!isOpen) return null;

    const handleMetaChange = (index, newValue) => {
        const newMeta = [...metadata];
        // Enforce prefix if the user tries to delete it, to be helpful
        // Actually, if they want to rename +pro to @pro, why not? But let's not restrict. Just save current value.
        newMeta[index].current = newValue;
        setMetadata(newMeta);
    };

    const renderMetaIcon = (type) => {
        switch (type) {
            case 'project': return <span className="text-blue-500 font-bold px-2 py-1 bg-blue-500/10 rounded mr-2">+</span>;
            case 'context': return <span className="text-purple-500 font-bold px-2 py-1 bg-purple-500/10 rounded mr-2">@</span>;
            default: return <span className="text-teal-500 font-bold px-2 py-1 bg-teal-500/10 rounded mr-2">#</span>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end" onClick={onClose}>
            <div
                className="bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-700 shadow-2xl w-full max-w-md h-full flex flex-col animate-in slide-in-from-right duration-300"
                onClick={e => e.stopPropagation()}
            >

                {/* Header */}
                <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
                    <div>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Batch Edit Metadata
                        </h2>
                        <p className="text-xs text-zinc-500 mt-1">Editing {selectedTasks.length} selected tasks</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">

                    {/* Status Fields (Prio & Due) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Priority</label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder={priority === 'MIXED' ? 'Mixed' : '(A-Z)'}
                                    value={priority === 'MIXED' ? '' : priority}
                                    onChange={e => {
                                        const val = e.target.value.toUpperCase();
                                        if (val.includes(' ')) {
                                            setPriority('');
                                        } else {
                                            const clean = val.replace(/[^A-Z]/g, '');
                                            if (clean) setPriority(clean[clean.length - 1]);
                                            else if (e.target.value === '') setPriority('');
                                        }
                                    }}
                                    className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500"
                                />
                                {priority !== '' && priority !== 'MIXED' && (
                                    <button type="button" onClick={() => setPriority('')} className="absolute right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Due Date</label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    value={dueDate === 'MIXED' ? '' : dueDate}
                                    onChange={e => setDueDate(e.target.value)}
                                    className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 pr-16 text-sm focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => onOpenCalendar(date => setDueDate(date))}
                                    className="absolute right-8 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 z-10"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>
                                {dueDate !== '' && dueDate !== 'MIXED' && (
                                    <button type="button" onClick={() => setDueDate('')} className="absolute right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 z-20">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4"></div>

                    {/* Add Brand New Metadata */}
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Add New Tags/Projects</label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={additions}
                                onChange={e => setAdditions(e.target.value)}
                                placeholder="+newProject @newContext"
                                className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500"
                            />
                            {additions !== '' && (
                                <button type="button" onClick={() => setAdditions('')} className="absolute right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4"></div>

                    {/* Metadata Renaming List */}
                    {metadata.length > 0 && (
                        <div>
                            <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Rename or Remove Found Metadata</label>
                            <div className="space-y-2">
                                {metadata.map((item, index) => (
                                    <div key={item.original} className="flex items-center gap-2">
                                        {renderMetaIcon(item.type)}
                                        <div className="flex-1 flex items-center bg-zinc-100 dark:bg-zinc-800/50 rounded-lg focus-within:ring-1 focus-within:ring-blue-500 overflow-hidden relative">
                                            <div className="px-3 min-w-[80px] max-w-[120px] truncate text-xs text-zinc-500 border-r border-zinc-200 dark:border-zinc-700/50" title={item.original}>
                                                {item.original}
                                            </div>
                                            <input
                                                type="text"
                                                value={item.current}
                                                onChange={e => handleMetaChange(index, e.target.value)}
                                                placeholder="Clear to remove"
                                                className="flex-1 bg-transparent border-none px-3 py-2 pr-8 text-sm focus:ring-0 text-zinc-900 dark:text-zinc-100"
                                            />
                                            {item.current !== '' && (
                                                <button type="button" onClick={() => handleMetaChange(index, '')} className="absolute right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-zinc-500 mt-2 ml-1">Tip: Clear the input text completely to remove the metadata from all selected tasks.</p>
                        </div>
                    )}

                </form>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
