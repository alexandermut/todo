# 📝 todo App

A minimalist, offline-first web app for managing tasks in the `todo.txt` format, featuring optional Google Drive synchronization.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Live Demo

Try the app live: **[https://alexandermut.github.io/todo/](https://alexandermut.github.io/todo/)**

*(Note: Google Drive Sync currently requires the user account `mutalex@gmail.com` to be added as a test user in the Google Cloud Console setup.)*

---

## Screenshots

**Desktop View:**

*(Add a screenshot of the desktop layout here)*

**Mobile View:**

*(Add a screenshot of the mobile layout here)*

---

## Features

* **`todo.txt` Format:** Manages tasks including priorities `(A)`, projects `+project`, contexts `@context`, creation/completion dates, and metadata like `due:YYYY-MM-DD`.
* **Offline-First:** Stores all data locally in your browser's `localStorage` by default.
* **Optional Google Drive Sync:** Securely sync your `todo.txt` file using Google Drive's hidden `appDataFolder`. You control when to push or pull data.
* **Core Task Management:** Add, edit, and delete tasks easily.
* **Quick Completion:** Toggle tasks between open and done using checkboxes or the `x` keyboard shortcut.
* **Filtering:**
    * By status: All, Open, Done.
    * By structure: Priority, Project (`+`), Context (`@`).
    * Special filters: No Due Date, No Project, No Context, No Priority.
    * Full-text search combined seamlessly with filters.
* **Sorting:** Arrange tasks by Default (file order), Priority, Project, Context, or Due Date.
* **Autocomplete:** Suggestions for Projects (`+`) and Contexts (`@`) while typing.
* **Bulk Actions:** Select multiple tasks to complete or delete them all at once.
* **Undo:** Reverse recent actions like adding, completing, or deleting tasks.
* **Import/Export:** Load tasks from `.txt` files or export your current list.
* **Archiving:** Move completed tasks to a separate `done.txt` file (via download).
* **Responsive Design:** Optimized layout for both desktop and mobile devices, featuring a burger menu and a bottom input bar on smaller screens.
* **Keyboard Shortcuts:** Efficiently manage tasks without leaving the keyboard.
* **Light/Dark Mode:** Automatically adapts to your system's theme preference (`prefers-color-scheme`).

---

## Tech Stack

* **HTML5**
* **CSS3** (including CSS Variables for theming)
* **Vanilla JavaScript** (ES6+)
* **Google Identity Services (GIS)** for authentication
* **Google Drive API v3** for file synchronization
* **No Frameworks, No Build Tools** - Just a single HTML file!

---

## Usage / Getting Started

### Live Version

The easiest way is to use the **[Live Demo](https://alexandermut.github.io/todo/)**.

### Local Execution

1.  Download the `index.html` file from the repository.
2.  Open your terminal or command prompt.
3.  Navigate to the directory where you saved the file (`cd path/to/folder`).
4.  Start a simple local web server: `python -m http.server 8080` (or `python3 ...` if needed).
5.  Open your web browser and go to `http://localhost:8080/index.html`.

*Note: Google Drive Sync will only work locally if you add `http://localhost:8080` to the "Authorized JavaScript origins" in your Google Cloud Console project's API credentials.*

---

## Google Drive Sync Setup (Optional)

Syncing with Google Drive is optional and requires a Google Account.

1.  **Click "connect to G-Drive"** in the app.
2.  **Sign in** with your Google Account and grant the requested permission (the app only asks for access to its own hidden data folder `appDataFolder`).
3.  Use the **"save to G-Drive" (Push ➔)** and **"load from G-Drive" (Pull 🡸)** buttons to manually sync your local data with the cloud.

*Note for Developers:* To use this feature in your own local copy or fork, you need to create your own **Client ID** in the Google Cloud Console:
    1.  Create a Google Cloud project.
    2.  Enable the **Google Drive API**.
    3.  Create an **OAuth 2.0 Client ID** for a **Web application**.
    4.  Add your authorized origins (e.g., `http://localhost:8080`, your GitHub Pages URL).
    5.  Copy the generated Client ID into the `CLIENT_ID` variable in the `index.html` file.
    6.  Ensure the requested scope remains `https://www.googleapis.com/auth/drive.appdata`.

---

## Keyboard Shortcuts

| Key              | Action                    |
| ---------------- | ------------------------- |
| `/`              | Focus Search/Add input    |
| `↑` / `↓`        | Navigate tasks            |
| `←` / `→`        | Change priority (selected)|
| `e`              | Edit selected task        |
| `x`              | Toggle done (selected)    |
| `p` then `A-Z`   | Set priority (selected)   |
| `Cmd/Ctrl + Z`   | Undo last action          |
| `Delete`/`Backspace` | Delete selected task      |
| `Esc`            | Clear search/filter       |

---

## Search Syntax

Combine search terms freely in the input field:

* `+projectname` - Filter by project
* `@contextname` - Filter by context
* `prio:A` - Filter by priority (A-Z)
* `is:open` / `is:done` - Filter by status
* `is:no-due` / `is:no-project` / `is:no-context` / `is:no-prio` - Special filters
* `any other text` - Full-text search within task descriptions

*Example:* `+work @phone call mom prio:A is:open`

---

## Contributing (Optional)

Found a bug or have an idea? Feel free to open an Issue or submit a Pull Request.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Open a Pull Request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
