import React from 'react';

export function Datenschutz() {
    return (
        <div className="text-zinc-300 max-w-2xl mx-auto pb-20 p-4">
            <header className="mb-8 border-b border-zinc-800 pb-4">
                <h1 className="text-3xl font-bold text-zinc-100">Datenschutzerklärung</h1>
            </header>

            <div className="space-y-8 text-sm leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">1. Verantwortlicher</h2>
                    <p className="text-zinc-400 mb-2">
                        Verantwortlicher für die Datenverarbeitung im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                    </p>
                    <p className="text-zinc-400 mb-2">
                        Alexander Mut<br />
                        Falkenbergsweg 66<br />
                        21149 Hamburg<br />
                        E-Mail: mutalex (at) gmail (punkt) com
                    </p>
                    <p className="text-zinc-500 italic">
                        (Weitere Angaben siehe Impressum)
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">2. Geltungsbereich</h2>
                    <p className="text-zinc-400">
                        Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb dieser Webanwendung (im Folgenden "App"), die unter https://alexandermut.github.io/protodo/index.html und deren Unterseiten betrieben wird, auf.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">3. Datenverarbeitung im Überblick</h2>
                    <p className="text-zinc-400 mb-4">
                        Diese App ist als "Offline-First"-Anwendung konzipiert. Die Kernfunktionalität erfordert keine Übertragung Ihrer persönlichen Daten an den Anbieter dieser App.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                        <li><strong className="text-zinc-300">Hosting (GitHub Pages):</strong> Beim Aufruf der App werden Daten (z.B. IP-Adresse) an den Hosting-Anbieter übertragen.</li>
                        <li><strong className="text-zinc-300">Externe Skripte (Google):</strong> Um die Anmeldung zu ermöglichen, lädt die App Skripte von Google-Servern, wodurch Ihre IP-Adresse an Google übermittelt werden kann.</li>
                        <li><strong className="text-zinc-300">Lokale Speicherung (LocalStorage):</strong> Ihre Aufgaben werden primär lokal in Ihrem Browser gespeichert.</li>
                        <li><strong className="text-zinc-300">Synchronisierung (Google / Dropbox):</strong> Nur bei aktiver Nutzung werden Daten direkt zwischen Ihrem Browser und dem gewählten Cloud-Anbieter übertragen.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">4. Datenverarbeitung im Detail</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-zinc-200 mb-2">a) Hosting durch GitHub Pages</h3>
                        <p className="text-zinc-400 mb-2">
                            Diese App wird bei GitHub Pages, einem Dienst der GitHub, Inc. (88 Colin P Kelly Jr St, San Francisco, CA 94107, USA), gehostet.
                        </p>
                        <p className="text-zinc-400 mb-2">
                            Beim Aufruf der App werden von GitHub Server-Logfiles erhoben (IP-Adresse, Browserdaten, etc.), um den Dienst sicher bereitzustellen (Art. 6 Abs. 1 lit. f DSGVO).
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-zinc-200 mb-2">b) Einbindung von Google-Diensten (Google Identity Services)</h3>
                        <p className="text-zinc-400 mb-2">
                            Um die Authentifizierung und Synchronisierung mit Google-Diensten zu ermöglichen, wird beim Start der App der "Google Identity Services"-Client (gsi/client) geladen.
                        </p>
                        <p className="text-zinc-400 mb-2">
                            Hierbei baut Ihr Browser eine direkte Verbindung zu den Servern von Google auf. Google erhält dadurch die Information, dass Sie diese Webseite aufgerufen haben (inkl. Ihrer IP-Adresse), auch wenn Sie sich nicht einloggen. Dies ist technisch notwendig, um die Login-Funktionalität bereitzustellen.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-zinc-200 mb-2">c) Google Drive & Google Tasks Synchronisation</h3>
                        <p className="text-zinc-400 mb-2">
                            Sie haben die Möglichkeit, Ihre Aufgaben mit Google Drive zu synchronisieren oder an Google Tasks zu senden. Dies geschieht ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) durch den Login ("Sign in with Google").
                        </p>
                        <p className="text-zinc-400 mb-2">
                            <strong className="text-zinc-300">Umfang:</strong> Die App erhält Zugriff auf einen speziellen Anwendungsordner in Ihrem Google Drive (zur Speicherung der `todo.txt`) sowie das Recht, Aufgaben in Ihren Google Tasks zu erstellen.
                        </p>
                        <p className="text-zinc-400 mb-2">
                            <strong className="text-zinc-300">Datenübermittlung:</strong> Die Datenübertragung findet direkt verschlüsselt zwischen Ihrem Endgerät und den Google-Servern statt. Der Anbieter der App hat keinen Zugriff auf Ihr Google-Konto.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-zinc-200 mb-2">d) Dropbox Synchronisation</h3>
                        <p className="text-zinc-400 mb-2">
                            Alternativ können Sie den Dienst Dropbox zur Synchronisierung nutzen. Anbieter ist die Dropbox International Unlimited Company (Irland).
                        </p>
                        <p className="text-zinc-400 mb-2">
                            <strong className="text-zinc-300">Funktionsweise:</strong> Nach Ihrer expliziten Authentifizierung (OAuth) erhält die App einen Zugriffstoken, der lokal in Ihrem Browser gespeichert wird. Mit diesem Token kann die App die Datei `todo.txt` in Ihrem Dropbox-Speicher lesen und schreiben.
                        </p>
                        <p className="text-zinc-400 mb-2">
                            <strong className="text-zinc-300">Rechtsgrundlage:</strong> Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-4">5. Ihre Rechte</h2>
                    <p className="text-zinc-400 mb-4">
                        Sie haben gemäß DSGVO das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer bei uns gespeicherten Daten.
                    </p>
                    <p className="text-zinc-400 mb-2">
                        Da wir als App-Anbieter keine Benutzerdaten auf eigenen Servern speichern, wenden Sie sich für die Ausübung Ihrer Rechte bezüglich der Cloud-Daten (Drive/Dropbox) bitte direkt an die jeweiligen Anbieter oder nutzen Sie die Löschfunktionen innerhalb der Dienste.
                    </p>
                    <p className="text-zinc-400">
                        Lokale Daten ("LocalStorage") können Sie jederzeit selbst durch das Leeren Ihres Browser-Caches löschen.
                    </p>
                </section>
            </div>
        </div>
    );
}
