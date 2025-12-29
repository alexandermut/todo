# Todo App - Development Roadmap

## Project Status: React + Rust Migration 🚀

**Current Stack:** React 18, Vite, Tailwind CSS, Rust (WASM)

### ✅ Completed Features
- **Project Setup**: Migrated to modern Vite + React architecture.
- **Styling**: Implemented Todoist-inspired design using Tailwind CSS (Red header, sidebar navigation, clear typography).
- **Core Logic**: `todo.txt` parsing logic rewritten in **Rust** and compiled to WebAssembly for performance.
- **Rendering**: Tasks are rendered with priority colors, project/context highlighting, and metadata.
- **Server**: Development server configured (`npm run dev`).

### 🚧 In Progress
- **Live Preview**: Server is running.
- **Persistence**: Connecting React state to LocalStorage fully.
- **Task Interaction**: Toggling completion state via UI (Store logic exists, connecting to UI).

---

## 📅 Remaining Features (Backlog)

### Essential (MVP)
- [ ] **Add/Edit Tasks**: UI for adding new tasks and editing existing ones.
- [ ] **Filtering**: Sidebar clicks (Inbox, Today, Projects, Contexts) should filter the task list.
- [ ] **Persistence**: Ensure `todo.txt` format is correctly saved to LocalStorage.
- [ ] **Delete Tasks**: Button/Shortcut to delete tasks.

### Enhanced Features (Todoist-Style)
- [ ] **Date Picker**: User-friendly date picker for `due:YYYY-MM-DD`.
- [ ] **Keyboard Shortcuts**: `j`/`k` navigation, `x` complete, `q` quick add.
- [ ] **Drag & Drop**: Reorder tasks manually.
- [ ] **Subtasks**: Visual nesting for indented tasks.
- [ ] **Google Drive Sync**: Porting the GDrive sync logic from the old version to React.

### Planned Improvements
- [ ] **Unique IDs**: Use `createdate` + random string as unique ID.
- [ ] **Search**: Fixated search bar with auto-clear.
- [ ] **Notes**: Support for task notes (Markdown).
- [ ] **Theming**: Dark mode support via Tailwind `dark:` classes.

### Future Ideas / Discussions
- [ ] **Word Filtering**: Evaluate Alt+Click (or similar interaction) to filter by any arbitrary word in a task without conflicting with edit mode.
