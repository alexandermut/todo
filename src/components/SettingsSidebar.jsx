
import React, { useState } from 'react';

export function SettingsSidebar({
    isOpen,
    onClose,
    // Sync Props
    onSyncClick,
    onPullClick,
    isSyncing,
    isAuthenticated,
    onDropboxSync,
    onDropboxPull,
    isDropboxAuth,
    isDropboxSyncing,
    onGTasksSync,
    onGTasksPull,
    onClearAll
}) {
    const [isSyncOpen, setIsSyncOpen] = useState(false);
    const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
    const [isSyntaxOpen, setIsSyntaxOpen] = useState(false);

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
            w-[305px] bg-zinc-900 flex flex-col border-l border-zinc-800 pt-8 px-4 shrink-0 overflow-y-auto
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0 shadow-xl' : 'translate-x-full'}
            text-zinc-300
        `}>
                <div className="flex justify-between items-center mb-6 px-2">
                    <h2 className="text-lg font-bold text-gray-100">Settings</h2>
                </div>

                {/* Sync Section */}
                <div className="mb-4">
                    <button
                        onClick={() => setIsSyncOpen(!isSyncOpen)}
                        className="w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors"
                    >
                        <span>Sync</span>
                        <span>{isSyncOpen ? '−' : '+'}</span>
                    </button>

                    {isSyncOpen && (
                        <div className="space-y-2 px-2 animate-in slide-in-from-top-2 duration-200">
                            {/* Google Drive */}
                            <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors">
                                <span className="text-sm text-gray-300">Google Drive</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={onSyncClick}
                                        className={`p-1.5 rounded hover:bg-zinc-700 ${isSyncing ? 'animate-pulse text-blue-500' : 'text-gray-500'}`}
                                        title={isAuthenticated ? "Sync Drive" : "Login Google"}
                                    >
                                        {isAuthenticated ? '☁️' : '🔑'}
                                    </button>
                                    {isAuthenticated && (
                                        <button
                                            onClick={onPullClick}
                                            className={`p-1.5 rounded hover:bg-zinc-700 ${isSyncing ? 'animate-spin' : 'text-gray-500'}`}
                                            title="Pull from Drive"
                                        >
                                            🔄
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Google Tasks */}
                            {isAuthenticated && (
                                <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors">
                                    <span className="text-sm text-gray-300">Google Tasks</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={onGTasksSync}
                                            className={`p-1.5 rounded hover:bg-zinc-700 ${isSyncing ? 'animate-pulse text-blue-500' : 'text-gray-500'}`}
                                            title="Push to Google Tasks"
                                        >
                                            📦
                                        </button>
                                        <button
                                            onClick={onGTasksPull}
                                            className={`p-1.5 rounded hover:bg-zinc-700 ${isSyncing ? 'animate-pulse text-blue-500' : 'text-gray-500'}`}
                                            title="Pull from Google Tasks"
                                        >
                                            🔄
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Dropbox */}
                            <div className="flex items-center justify-between p-2 rounded hover:bg-zinc-800/50 transition-colors">
                                <span className="text-sm text-gray-300">Dropbox</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={onDropboxSync}
                                        className={`p-1.5 rounded hover:bg-zinc-700 ${isDropboxSyncing ? 'animate-pulse text-blue-500' : 'text-gray-500'}`}
                                        title={isDropboxAuth ? "Sync Dropbox" : "Login Dropbox"}
                                    >
                                        {isDropboxAuth ? '📦' : 'Login'}
                                    </button>
                                    {isDropboxAuth && (
                                        <button
                                            onClick={onDropboxPull}
                                            className={`p-1.5 rounded hover:bg-zinc-700 ${isDropboxSyncing ? 'animate-spin' : 'text-gray-500'}`}
                                            title="Pull from Dropbox"
                                        >
                                            🔄
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Clear All Tasks */}
                <div className="mb-4 p-3 rounded bg-zinc-800/30 border border-red-900/30">
                    <button
                        onClick={onClearAll}
                        className="w-full px-3 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors flex items-center justify-center gap-2"
                    >
                        <span>🗑️</span>
                        <span>Clear All Tasks</span>
                    </button>
                </div>

                {/* Shortcuts & Help Section */}
                <div className="mb-4">
                    <button
                        onClick={() => setIsShortcutsOpen(!isShortcutsOpen)}
                        className="w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors"
                    >
                        <span>Shortcuts</span>
                        <span>{isShortcutsOpen ? '−' : '+'}</span>
                    </button>

                    {isShortcutsOpen && (
                        <div className="space-y-1 px-2 text-sm animate-in slide-in-from-top-2 duration-200">
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Focus search</span>
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">/</kbd>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Navigate</span>
                                <div className="flex gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">↑</kbd>
                                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">↓</kbd>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Priority</span>
                                <div className="flex gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">←</kbd>
                                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">→</kbd>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Edit</span>
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">e</kbd>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Complete</span>
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">x</kbd>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Delete</span>
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">Del</kbd>
                            </div>
                            <div className="flex justify-between items-center py-1">
                                <span className="text-gray-400">Clear</span>
                                <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-gray-400">Esc</kbd>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Helper Section */}
                <div className="mb-4">
                    <button
                        onClick={() => setIsSyntaxOpen(!isSyntaxOpen)}
                        className="w-full flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2 py-2 hover:bg-zinc-800 rounded transition-colors"
                    >
                        <span>Search Syntax</span>
                        <span>{isSyntaxOpen ? '−' : '+'}</span>
                    </button>

                    {isSyntaxOpen && (
                        <div className="space-y-2 px-2 text-xs text-gray-400 animate-in slide-in-from-top-2 duration-200">
                            <div className="flex gap-2">
                                <code className="text-blue-400 bg-blue-900/30 px-1 rounded">prio:A</code>
                                <span>Priority</span>
                            </div>
                            <div className="flex gap-2">
                                <code className="text-purple-400 bg-purple-900/30 px-1 rounded">+proj</code>
                                <span>Project</span>
                            </div>
                            <div className="flex gap-2">
                                <code className="text-green-400 bg-green-900/30 px-1 rounded">@ctx</code>
                                <span>Context</span>
                            </div>
                            <div className="flex gap-2">
                                <code className="text-orange-400 bg-orange-900/30 px-1 rounded">is:open</code>
                                <span>Status</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Close Button - Bottom Right */}
                <button
                    onClick={onClose}
                    className="absolute bottom-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                    title="Close settings"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </aside>
        </>
    );
}
