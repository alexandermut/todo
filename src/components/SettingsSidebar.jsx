import React, { useState } from 'react';

// --- Icons ---
const GoogleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21-1.19-2.22z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const DropboxIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17l5 3 5-3-5-3-5 3z" className="text-blue-500 fill-blue-500/20" stroke="none" />
        <path d="M2 12l5 3 5-3-5-3-5 3z" stroke="#3B82F6" />
        <path d="M7 7l5 3 5-3-5-3-5 3z" stroke="#3B82F6" />
        <path d="M17 17l5-3-5-3-5 3-5-3z" stroke="#3B82F6" />
        <path d="M17 7l5-3-5-3-5 3-5-3z" stroke="#3B82F6" />
    </svg>
);

const DriveIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44.1c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47" />
        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 11.1-19.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.4-4.5 1.2z" fill="#00832d" />
        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z" fill="#2684fc" />
        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
    </svg>
);

const TasksIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" className="text-blue-500" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronDown = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export function SettingsSidebar({
    isOpen,
    onClose,
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
    onClearAll,
    dropboxLastSync // Added prop
}) {
    const [isSyncOpen, setIsSyncOpen] = useState(true);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside className={`
            w-[320px] bg-zinc-950/95 backdrop-blur-xl flex flex-col border-l border-zinc-800/50 pt-6 px-0 shrink-0 overflow-y-auto
            fixed inset-y-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isOpen ? 'translate-x-0 shadow-2xl shadow-black/50' : 'translate-x-[110%]'}
            text-zinc-300 font-sans
        `}>
                <div className="flex justify-between items-center mb-8 px-6">
                    <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-full transition-all"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 px-4 space-y-4">

                    {/* Cloud Sync Section */}
                    <div className="border border-zinc-800/50 rounded-2xl bg-zinc-900/30 overflow-hidden">
                        <button
                            onClick={() => setIsSyncOpen(!isSyncOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-800/30 transition-colors"
                        >
                            <span className="text-sm font-semibold text-zinc-100 uppercase tracking-widest text-[10px]">Cloud Sync</span>
                            <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isSyncOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSyncOpen && (
                            <div className="px-3 pb-3 space-y-2 animate-in slide-in-from-top-1 fade-in duration-200">
                                {/* Google Drive */}
                                <div className="group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 hover:border-zinc-700/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-zinc-800/50 rounded-lg">
                                                <DriveIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-zinc-200">Google Drive</span>
                                                <span className={`text-[10px] uppercase tracking-wider font-bold ${isAuthenticated ? 'text-green-500' : 'text-zinc-600'}`}>
                                                    {isAuthenticated ? 'Connected' : 'Disconnected'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={onSyncClick}
                                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${isAuthenticated
                                                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'
                                                }`}
                                        >
                                            {isAuthenticated ? (isSyncing ? 'Syncing...' : 'Sync Now') : 'Connect'}
                                        </button>
                                        {isAuthenticated && (
                                            <button
                                                onClick={onPullClick}
                                                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
                                                title="Force Pull"
                                            >
                                                <svg className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8h8M20 12V4h-8M4 20l9-9M20 4l-9 9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Dropbox */}
                                <div className="group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 hover:border-zinc-700/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-zinc-800/50 rounded-lg">
                                                <DropboxIcon className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-zinc-200">Dropbox</span>
                                                <span className={`text-[10px] uppercase tracking-wider font-bold ${isDropboxAuth ? 'text-green-500' : 'text-zinc-600'}`}>
                                                    {isDropboxAuth ? 'Connected' : 'Disconnected'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={onDropboxSync}
                                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${isDropboxAuth
                                                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                                                : 'bg-[#0061FE] hover:bg-[#0057E5] text-white shadow-lg shadow-blue-900/20'
                                                }`}
                                        >
                                            {isDropboxAuth ? (isDropboxSyncing ? 'Syncing...' : 'Sync Now') : 'Connect'}
                                        </button>
                                        {isDropboxAuth && (
                                            <button
                                                onClick={onDropboxPull}
                                                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
                                                title="Force Pull"
                                            >
                                                <svg className={`w-4 h-4 ${isDropboxSyncing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8h8M20 12V4h-8M4 20l9-9M20 4l-9 9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </button>
                                        )}
                                    </div>
                                    {isDropboxAuth && dropboxLastSync && (
                                        <div className="mt-2 text-center">
                                            <span className="text-[10px] text-zinc-500 font-mono">
                                                Last successful push: {(() => {
                                                    const d = new Date(dropboxLastSync);
                                                    const p = n => n.toString().padStart(2, '0');
                                                    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
                                                })()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Google Tasks */}
                                {isAuthenticated && (
                                    <div className="group bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 hover:border-zinc-700/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-zinc-800/50 rounded-lg">
                                                <TasksIcon className="w-5 h-5" />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-200">Google Tasks</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={onGTasksSync} className="py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                                                Push ↗
                                            </button>
                                            <button onClick={onGTasksPull} className="py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                                                Pull ↙
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>


                    {/* Danger Zone */}
                    <div className="mt-8 pt-4 border-t border-zinc-800/50">
                        <button
                            onClick={onClearAll}
                            className="w-full group relative overflow-hidden px-4 py-2.5 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Clear System
                            </span>
                        </button>
                    </div>

                    <div className="text-center pb-8 pt-4">
                        <span className="text-[10px] text-zinc-600 font-mono">{__APP_VERSION__}</span>
                    </div>

                </div>
            </aside>
        </>
    );
}
