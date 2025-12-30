import React from 'react';

export function Impressum({ onBack }) {
    return (
        <div className="text-zinc-300 max-w-2xl mx-auto pb-20 p-4">
            {onBack && (
                <button
                    onClick={onBack}
                    className="mb-4 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M5 12l7 7M5 12l7-7" />
                    </svg>
                    Back to App
                </button>
            )}
            <header className="mb-8 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-bold text-zinc-100">Impressum</h1>
            </header>

            <div className="space-y-8 text-sm leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">Angaben gemäß § 5 TMG</h2>
                    <p className="text-zinc-400">
                        Alexander Mut<br />
                        Falkenbergsweg 66<br />
                        21149 Hamburg<br />
                        Deutschland
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">Kontakt</h2>
                    <p className="text-zinc-400">
                        Telefon: +49 151 51 00 27 67<br />
                        E-Mail: mutalex (at) gmail (punkt) com
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
                    <p className="text-zinc-400">
                        Alexander Mut<br />
                        Falkenbergsweg 66<br />
                        21149 Hamburg
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-zinc-200 mb-2">Haftungsausschluss</h3>
                    <p className="text-zinc-400">
                        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                    </p>
                </section>
            </div>
        </div>
    );
}
