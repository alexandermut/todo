
/**
 * Parses a search query and filters tasks.
 * Supported syntax:
 * - prio:A|B|C (case insensitive)
 * - +project (matches project names)
 * - @context (matches context names)
 * - is:open (not completed)
 * - is:done (completed)
 * - is:no-due (no due date)
 * - generic text match
 * 
 * @param {Array} tasks - List of tasks to filter
 * @param {string} query - Search query string
 * @returns {Array} - Filtered list of tasks
 */
export const searchParser = (tasks, query) => {
    if (!query || !query.trim()) return tasks;

    const terms = query.trim().split(/\s+/);

    return tasks.filter(task => {
        return terms.every(term => {
            const lowerTerm = term.toLowerCase();

            // Priority filter: prio:A or prio:a
            if (lowerTerm.startsWith('prio:')) {
                const prioValue = lowerTerm.split(':')[1]?.toUpperCase();
                // Metadata priority is usually (A), (B), (C) or null
                // We check if the task's priority matches the requested letter
                return task.priority === prioValue;
            }

            // Project filter: +project
            if (lowerTerm.startsWith('+')) {
                const project = lowerTerm.substring(1);
                // Projects are stored in an array
                return task.projects && task.projects.some(p => p.toLowerCase().includes(project));
            }

            // Context filter: @context
            if (lowerTerm.startsWith('@')) {
                const context = lowerTerm.substring(1);
                // Contexts are stored in an array
                return task.contexts && task.contexts.some(c => c.toLowerCase().includes(context));
            }

            // Status filters: is:open, is:done
            if (lowerTerm === 'is:open') {
                return !task.completed;
            }
            if (lowerTerm === 'is:done') {
                return task.completed;
            }

            // Other 'is' filters
            if (lowerTerm === 'is:no-due') {
                return !task.metadata || !task.metadata.due;
            }

            // Generic text search
            // Search in raw text
            return task.raw.toLowerCase().includes(lowerTerm);
        });
    });
};
