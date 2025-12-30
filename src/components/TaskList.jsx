import React, { useState, useMemo } from 'react';
import { TaskItem } from './TaskItem';


export function TaskList({ tasks, activeFilter, selectedTaskIds, onTaskSelect, focusedTaskId, editingTaskId, onEditEnd, onFilterClick, projects, contexts, tags, onOpenCalendar }) {


    return (
        <div className="pb-20">


            <div className="mb-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        selected={selectedTaskIds?.has(task.id)}
                        onSelect={() => onTaskSelect && onTaskSelect(task.id)}
                        selectionMode={selectedTaskIds && selectedTaskIds.size > 0}
                        isFocused={focusedTaskId === task.id}
                        isEditingProp={editingTaskId === task.id}
                        onEditEnd={onEditEnd}
                        onFilterClick={onFilterClick}
                        projects={projects}
                        contexts={contexts}
                        tags={tags}
                        onOpenCalendar={onOpenCalendar}
                    />
                ))}
            </div>


            {tasks.length === 0 && (
                <div className="py-8 w-full">

                    <div className="space-y-12 w-full">

                        {/* Visual Syntax Guide (Anatomy of a Task) */}
                        <div className="relative w-full px-4 mb-12">
                            <h3 className="text-zinc-500 font-medium text-xs uppercase tracking-wider mb-8 text-center">Anatomy of a Task</h3>

                            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-start">
                                {/* Component: Completed */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-zinc-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-zinc-300 transition-colors cursor-help">x</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Done</span>
                                </div>

                                {/* Component: Priority */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-amber-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-amber-400 transition-colors cursor-help">(A)</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Priority</span>
                                </div>

                                {/* Component: Date */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-zinc-200 transition-colors cursor-help">2025-12-30</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Created</span>
                                </div>

                                {/* Component: Description */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 px-2 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-zinc-100 transition-colors w-full text-center">call mum</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Description</span>
                                </div>

                                {/* Component: Project */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-cyan-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-cyan-400 transition-colors cursor-pointer">+Home</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Project</span>
                                </div>

                                {/* Component: Context */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-emerald-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-emerald-400 transition-colors cursor-pointer">@Phone</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Context</span>
                                </div>

                                {/* Component: Tag */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-purple-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-purple-400 transition-colors cursor-pointer">#urgent</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Hashtag</span>
                                </div>

                                {/* Component: Key:Value */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <span className="bg-zinc-800/80 border border-zinc-700/50 text-red-500 px-1.5 py-1 rounded font-mono text-sm group-hover:bg-zinc-800 group-hover:text-red-400 transition-colors cursor-pointer">due:2025-12-31</span>
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Due Date</span>
                                </div>
                            </div>
                        </div>

                        {/* Shortcuts */}
                        <div className="space-y-5">
                            <h3 className="text-zinc-500 font-medium text-xs uppercase tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                Keyboard Shortcuts
                            </h3>
                            <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm text-zinc-400 items-baseline">
                                <span className="justify-self-start"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">/</kbd></span>
                                <span>Focus search / New Task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">↑</kbd> <span className="text-zinc-600 text-[10px] px-0.5">/</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">↓</kbd></span>
                                <span>Navigate tasks</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">←</kbd> <span className="text-zinc-600 text-[10px] px-0.5">/</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">→</kbd></span>
                                <span>Change priority</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">x</kbd></span>
                                <span>Complete task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">e</kbd></span>
                                <span>Edit task</span>

                                <span className="justify-self-start text-nowrap"><kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">⌘</kbd> <span className="text-zinc-600 text-[10px] px-0.5">+</span> <kbd className="bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-[11px]">z</kbd></span>
                                <span>Undo action</span>
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="pt-8 border-t border-zinc-800/50">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs text-zinc-500">
                                <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> Google Drive & Dropbox Sync</span>
                                <span className="flex items-center gap-2"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg> Offline-first</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
