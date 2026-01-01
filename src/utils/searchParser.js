
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
            let isNegated = false;
            let checkTerm = lowerTerm;

            if (checkTerm.startsWith('-')) {
                isNegated = true;
                checkTerm = checkTerm.substring(1);
            }

            let match = false;

            // Priority filter: prio:A or (A)
            if (checkTerm.startsWith('prio:')) {
                const prioValue = checkTerm.split(':')[1]?.toUpperCase();
                match = task.priority === prioValue;
            }
            else if (/^\([a-z]\)$/.test(checkTerm)) {
                const prioValue = checkTerm[1].toUpperCase();
                match = task.priority === prioValue;
            }
            // Project filter: +project
            else if (checkTerm.startsWith('+')) {
                const project = checkTerm.substring(1);
                match = task.projects && task.projects.some(p => p.toLowerCase().includes(project));
            }
            // Context filter: @context
            else if (checkTerm.startsWith('@')) {
                const context = checkTerm.substring(1);
                match = task.contexts && task.contexts.some(c => c.toLowerCase().includes(context));
            }
            // Status filters
            else if (checkTerm === 'is:open') {
                match = !task.completed;
            }
            else if (checkTerm === 'is:done') {
                match = task.completed;
            }
            else if (checkTerm === 'is:no-due') {
                match = !task.metadata || !task.metadata.due;
            }
            // Generic text search
            else {
                match = task.raw.toLowerCase().includes(checkTerm);
            }

            return isNegated ? !match : match;
        });
    });
};
