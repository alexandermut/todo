
export function parse_todo_line(line) {
    let raw = line.trim();
    if (!raw) return null;

    const task = {
        id: generateId(),
        raw: raw,
        text: '',
        completed: false,
        priority: null,
        completionDate: null,
        creationDate: null,
        projects: [],
        contexts: [],
        tags: [],
        metadata: {}
    };

    let remaining = raw;

    // 1. Completed: x 2024-01-01
    if (remaining.startsWith('x ')) {
        task.completed = true;
        remaining = remaining.substring(2).trim();
    }

    // 2. Priority: (A)
    const priorityMatch = remaining.match(/^\(([A-Z])\)\s/);
    if (priorityMatch) {
        task.priority = priorityMatch[1];
        remaining = remaining.substring(priorityMatch[0].length).trim();
    }

    // 3. Dates: 2024-01-01 2024-01-02 or just 2024-01-02
    // Regex for date YYYY-MM-DD
    const dateRegex = /^(\d{4}-\d{2}-\d{2})/;
    const firstDateMatch = remaining.match(dateRegex);
    if (firstDateMatch) {
        const date1 = firstDateMatch[1];
        remaining = remaining.substring(date1.length).trim();

        // Check for second date
        const secondDateMatch = remaining.match(dateRegex);
        if (secondDateMatch) {
            // Two dates: first is completion, second is creation
            // BUT only if task is completed? Standard says:
            // x 2011-03-02 2011-03-01 Task text...
            // If not completed, only one date usually logic calls it creation date
            if (task.completed) {
                task.completionDate = date1;
                task.creationDate = secondDateMatch[1];
                remaining = remaining.substring(secondDateMatch[1].length).trim();
            } else {
                task.creationDate = date1; // Standard says single date is creation date
            }
        } else {
            // One date
            if (task.completed) {
                task.completionDate = date1; // Usually interpreted as completion if 'x' present
            } else {
                task.creationDate = date1;
            }
        }
    }

    task.text = remaining;

    // 4. Projects (+), Contexts (@), Metadata (key:val)
    // We scan the original *text* (or remaining) for these tags
    // Warning: tag must be separate words usually? Todo.txt is loose.
    // Regex: (?:^|\s)\+([\w.-]+)

    // Projects
    const projectMatches = remaining.matchAll(/(^|\s)\+([\w.-]+)/g);
    for (const match of projectMatches) {
        if (!task.projects.includes(match[2])) task.projects.push(match[2]);
    }

    // Contexts
    const contextMatches = remaining.matchAll(/(^|\s)@([\w.-]+)/g);
    for (const match of contextMatches) {
        if (!task.contexts.includes(match[2])) task.contexts.push(match[2]);
    }

    // Tags (#)
    const tagMatches = remaining.matchAll(/(^|\s)#([\w.-]+)/g);
    for (const match of tagMatches) {
        if (!task.tags.includes(match[2])) task.tags.push(match[2]);
    }

    // Metadata
    const metaMatches = remaining.matchAll(/(^|\s)(\w+):(\S+)/g);
    for (const match of metaMatches) {
        // match[2] key, match[3] value
        task.metadata[match[2]] = match[3];
    }

    return task;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
