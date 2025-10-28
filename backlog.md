# 🧭 Todo.txt App – Entwicklungs-Roadmap v2.0

**Technologie:** HTML / CSS / JavaScript (PWA, plattformunabhängig)
**Architektur:** Modular, offlinefähig, optional Cloud-Sync
**Strategie:** Hybrid-Ansatz – Purist (Keyboard-Power-User) + Pragmatiker (GUI-Komfort)

---

## 🏗 PHASE 1 – Fundament / MVP („Es funktioniert“)

**Ziel:** Minimal-funktionsfähige, stabile, barrierefreie Todo.txt-App mit Basis-Syntax und responsivem UI.

### 🔹 Core Features

* ✅ Todo.txt-Parser (Priorität (A), +Projekt, @Kontext, x-Erledigt, Datum)
* ✅ Lokales Datei-Handling (Open/Save mit File System Access API)
* ✅ Autosave + LocalStorage + done.txt-Archivierung
* ✅ Quick-Add-Leiste (für neue Tasks)
* ✅ Filter & Sort nach Priorität, Datum, Projekt, Kontext
* ✅ Kategorien & Tags (zusätzlich zu Projekten; Dropdown mit Farbcodes)
* ✅ Responsive Design (Mobile ↔ Desktop mit Touch-Optimierung)
* ✅ Dark Mode (automatisch nach Systemeinstellung + manuelles Toggle)
* ✅ Barrierefreiheit (a11y): ARIA, Keyboard-Navigation, Screen-Reader, Kontrast

### ⚙️ Technik

* Plain HTML + Vanilla JS (+ Tailwind CSS Designsystem)
* Modulstruktur (`parser.js`, `ui-list.js`, `filters.js`, `settings.js`)
* Lokale Persistenz + PWA-Offline-Caching

### 🎯 UX-Fokus

* Zero-Setup / Demo-Datei beim Start
* Farbige Syntax-Highlighting (Priorität, Projekt, Kontext, Datum)
* Sofortiges Hinzufügen ohne Formulare

---

## ⚙️ PHASE 2 – Komfort & Produktivität („Es macht Spaß“)

**Ziel:** Bedienkomfort + Alltagstauglichkeit für Nicht-Techniker.

### 🔹 Neue Features

* 📅 Fälligkeitsdaten (due:), Startdaten (t:), Wiederkehrende Tasks (rec:)
* 📆 Date-Picker + natürliche Sprache („morgen“, „Freitag“)
* 🧩 Subtasks / Nested Tasks (collapse/expand + Progress-Bar)
* 🔍 Suche in Echtzeit mit Highlighting im Titel und Beschreibung
* 📤 Export / Import (JSON, CSV, Markdown)
* ☁️ Cloud-Sync (Optionen: Dropbox, Supabase, iCloud Drive)
* 🗃 Mehrere todo.txt-Dateien (Tab-basiert)
* 🧠 Autovervollständigung für +Projekte und @Kontexte
* 🧩 Filter by: Status (Aktiv/Erledigt), Kategorie, Priorität

### 🖥 UI/UX

* Visual Badges für Kategorien & Prioritäten
* Überfällige Tasks = rot, heute = gelb, zukünftig = grau
* Kompakte Ansicht / Listenmodus umschaltbar
* Autosave / File-Watcher (Lokale Änderungserkennung)

---

## ⚡️ PHASE 3 – Power & Effizienz („Es beschleunigt mich“)

**Ziel:** Optimiert für Power-User, GTD-Nutzer und Produktivitätsfreaks.

### 🔹 Features

* ⌨️ Komplettes Tastenkürzel-System (Custom Keymap-Config via JSON)

  * `n` neu, `x` erledigt, `p` Priorität, `Cmd + F` Suche, `Cmd + Enter` neue Task
* 🔁 Recurring Tasks mit Auto-Regen nach Abschluss
* 🧮 Postpone (+1 Tag / +1 Woche)
* ↩️ Undo / Redo Stack (alle Aktionen rückgängig machbar)
* 🧩 Massen-Aktionen (Select Mode + Complete/Delete/Categorize)
* 🔗 Hyperlink-Erkennung + Click-to-open
* 🧰 Drag & Drop Reordering (SortableJS o. ähnlich)
* ⚡ Offline-Support (mit Auto-Sync beim Reconnect)

### 🧠 Power-Workflow

* Gespeicherte Filter / Smart Views („Heute“, „Wartend“, „Delegiert“)
* Progressive Filterung (Filter auf Filter)
* Sort Presets (Save & Apply)

### 🖥 UI/UX

* Command-Palette („Quick Actions“)
* Tastatur-Overlay (Shortcut-Cheatsheet)
* Sanfte Animationen (Framer Motion oder CSS Transitions)

---

## 🌐 PHASE 4 – Synchronisierung & Insights („Es verbindet mich“)

**Ziel:** Plattformübergreifende Nutzung, Analyse und Automatisierung.

### 🔹 Features

* ☁️ Erweiterter Cloud-Sync (Supabase/Firebase + verschlüsselter Login)
* 📅 iCal-Feed / Kalender-Integration (Google Calendar, Apple Calendar)
* 🔔 Browser-Benachrichtigungen (Web Notifications API)
* 🧾 Statistik-Dashboard mit Diagrammen (Line, Bar, Pie):

  * Tasks per Tag/Woche/Monat
  * Erledigungsrate
  * Kategorie-Breakdown
* 📦 Daten-Backup & Versionierung
* 🧩 Mehrgeräte-Sync (Desktop, Tablet, Mobile)
* 📊 „Focus-Meter“ (Prozent offene/erledigte Tasks)

### 💻 Technik

* Backend optional (über Supabase oder Firebase RTDB)
* Serverless Funktionen (Netlify / Vercel Functions)
* Caching und Sync-Queue im Browser

---

## 🧠 PHASE 5 – Ökosystem & Differenzierung („Es begeistert“)

**Ziel:** Markendifferenzierung + Community + monetarisierbares Premium-Level.

### 🔹 Features

* 🧭 GTD-Dashboard / „Cockpit“ mit anpinnbaren Panels

  * Filter-Widgets, Zähler, Charts, Timer
* 🧱 Markdown-Integration (Verlinkung zu Notizen, Obsidian / Logseq)
* 🧩 Plugin-API (JS Hooks, Custom Themes, Filter, Parser-Extensions)
* 💬 Kollaboration / Shared Lists / Task-Assignments (Phase 5.2)
* 🧑‍🤝‍🧑 Community-Store für Themes & Plugins
* 🎨 Theme-Builder mit Tailwind-Presets
* 📈 KI-gestützte Insights (später: Task-Priorisierung per LLM)

### 💰 Monetarisierung

* **Free:** Phasen 1 – 3 (Offline & Local Use)
* **Pro:** Sync, Dashboard, Benachrichtigungen, Plugins, iCal
* **Community-Store:** Paid Themes / Plugins (Revenue-Share)

---

## 🧩 TECH STACK (Stand v2.0)

| Komponente           | Empfehlung                               | Begründung                                         |
| -------------------- | ---------------------------------------- | -------------------------------------------------- |
| **Framework**        | Svelte oder Vanilla JS                   | leicht, schnell, perfekt für PWA + wenig Overhead  |
| **Styling**          | Tailwind CSS                             | schnelle Iterationen + Dark Mode via CSS Variables |
| **State Management** | Zustand (Svelte Store oder JS Singleton) | minimal und reaktiv                                |
| **Animation**        | Framer Motion / CSS Transitions          | UX-Polish                                          |
| **Sync-Backend**     | Supabase oder Firebase                   | Auth + Realtime Sync                               |
| **Testing**          | Playwright + Vitest                      | Cross-browser E2E und Unit Tests                   |
| **Build**            | Vite + PWA-Plugin                        | blitzschnell und leicht deploybar                  |
