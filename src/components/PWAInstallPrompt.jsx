import React, { useState, useEffect } from 'react';

export function PWAInstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Check if running on iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Check if already in standalone mode (PWA)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

        // Show prompt if on iOS and NOT standalone
        // Also check if user dismissed it previously (session or local storage)
        const hasDismissed = localStorage.getItem('pwa_prompt_dismissed');

        if (isIOS && !isStandalone && !hasDismissed) {
            // Delay slightly to not annoy immediately
            const timer = setTimeout(() => {
                setShowPrompt(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(20px+env(safe-area-inset-bottom))] animate-slide-up">
            <div className="max-w-md mx-auto bg-zinc-800/90 backdrop-blur-md border border-zinc-700 rounded-2xl shadow-2xl p-4 relative">
                <button
                    onClick={() => {
                        setShowPrompt(false);
                        localStorage.setItem('pwa_prompt_dismissed', 'true');
                    }}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-300 p-1"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="flex gap-4">
                    <div className="shrink-0 bg-zinc-700 rounded-xl w-12 h-12 flex items-center justify-center text-2xl">
                        📲
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-zinc-100 text-sm mb-1">App installieren / Vollbild</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                            Für das beste Erlebnis ohne Browser-Leisten:
                        </p>
                        <div className="text-xs text-zinc-300 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 flex items-center justify-center bg-zinc-700 rounded text-[10px]">1</span>
                                <span>Tippe auf <span className="inline-block"><svg className="w-4 h-4 inline text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> Teilen</span> (unten)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 flex items-center justify-center bg-zinc-700 rounded text-[10px]">2</span>
                                <span>Wähle <span className="font-semibold text-zinc-100">+ Zum Home-Bildschirm</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
