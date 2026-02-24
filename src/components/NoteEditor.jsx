import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { saveAs } from 'file-saver';
import { NoteService } from '../services/NoteService';

export function NoteEditor({ noteName, onClose }) {
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Load existing note or start fresh
        const existingNote = NoteService.getNote(noteName);
        if (existingNote) {
            setContent(existingNote);
            setIsEditing(false); // If it exists, default to view mode
        } else {
            setContent(`# ${noteName}\n\n`);
            setIsEditing(true); // If it's new, default to edit mode
        }
    }, [noteName]);

    useEffect(() => {
        // Auto-save logic (Debounced)
        const timeoutId = setTimeout(() => {
            // Avoid saving if content is completely empty and note doesn't exist yet,
            // though default content is injected anyway.
            NoteService.saveNote(noteName, content);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [content, noteName]);

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        // Use file-saver to download
        saveAs(blob, `${noteName}.md`);
    };

    return (
        <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col animate-in fade-in duration-300">
            {/* Header / Navbar section */}
            <header className="flex-shrink-0 border-b border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-white transition-colors hover:bg-zinc-800 rounded-lg"
                        title="Zurück zur Liste"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <h1 className="text-lg font-semibold text-zinc-100 truncate max-w-[200px] sm:max-w-md">
                        {noteName}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDownload}
                        className="px-3 py-1.5 text-sm md:text-base bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors flex items-center gap-2"
                        title="Markdown `.md` herunterladen"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        <span className="hidden sm:inline">Download</span>
                    </button>

                    {isEditing ? (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-1.5 text-sm md:text-base border border-blue-500/50 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors font-medium ml-2 shadow-sm"
                        >
                            Vorschau
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-1.5 text-sm md:text-base border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-lg transition-colors ml-2"
                        >
                            Bearbeiten
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-zinc-950 p-4 md:p-8">
                <div className="max-w-4xl mx-auto h-full">
                    {isEditing ? (
                        <textarea
                            className="w-full h-full min-h-[500px] bg-transparent text-zinc-300 font-mono text-base resize-none focus:outline-none placeholder-zinc-700 leading-relaxed"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Schreibe deine Notiz in Markdown..."
                            spellCheck={false}
                        />
                    ) : (
                        <div className="prose prose-invert prose-blue max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    a: ({ node, ...props }) => {
                                        if (props.href && (props.href.startsWith('/?note=') || props.href.startsWith('/?search='))) {
                                            return (
                                                <a
                                                    {...props}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.history.pushState({}, '', props.href);
                                                        window.dispatchEvent(new Event('popstate'));
                                                        if (props.href.startsWith('/?search=')) {
                                                            onClose(); // Close editor if navigating to a search
                                                        }
                                                    }}
                                                    className="text-yellow-400 hover:text-yellow-300 no-underline hover:underline cursor-pointer"
                                                />
                                            )
                                        }
                                        return <a {...props} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />;
                                    }
                                }}
                            >
                                {content.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
                                    if (p1.startsWith('task:')) {
                                        return `[${p1.substring(5)}](/?search=${encodeURIComponent(p1.substring(5))})`;
                                    }
                                    return `[${p1}](/?note=${encodeURIComponent(p1)})`;
                                }) || '*Kein Inhalt*'}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
