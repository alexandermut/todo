
/**
 * Helper to parse a date string into a comparable numeric value (timestamp).
 * Supports YYYY-MM-DD, DD.MM.YYYY, DD.MM.YY.
 * Returns a large number for invalid/missing dates to push them to the end (or beginning depending on sort).
 */
export const parseDateValue = (dateStr) => {
    if (!dateStr) return 9999999999999; // Far future for no date

    // Try ISO YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        return new Date(dateStr).getTime();
    }

    // Try DD.MM.YYYY
    const ddmmyyyy = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (ddmmyyyy) {
        return new Date(`${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`).getTime();
    }

    // Try DD.MM.YY
    const ddmmyy = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2})$/);
    if (ddmmyy) {
        const year = parseInt(ddmmyy[3], 10) + 2000; // Assume 20xx
        return new Date(`${year}-${ddmmyy[2]}-${ddmmyy[1]}`).getTime();
    }

    return 9999999999999;
};

export const sortTasks = (tasks, criteria) => {
    if (!tasks) return [];
    const sorted = [...tasks];

    switch (criteria) {
        case 'priority':
            // A > B > C > None
            return sorted.sort((a, b) => {
                if (a.priority && !b.priority) return -1;
                if (!a.priority && b.priority) return 1;
                if (a.priority && b.priority) return a.priority.localeCompare(b.priority);
                return 0;
            });

        case 'due':
            // Chronological
            return sorted.sort((a, b) => {
                const valA = parseDateValue(a.due || a.metadata?.due);
                const valB = parseDateValue(b.due || b.metadata?.due);
                return valA - valB;
            });

        case 'project':
            // Alphabetical by first project
            return sorted.sort((a, b) => {
                const projA = (a.projects && a.projects[0]) || 'zzzz';
                const projB = (b.projects && b.projects[0]) || 'zzzz';
                return projA.localeCompare(projB);
            });

        case 'context':
            // Alphabetical by first context
            return sorted.sort((a, b) => {
                const ctxA = (a.contexts && a.contexts[0]) || 'zzzz';
                const ctxB = (b.contexts && b.contexts[0]) || 'zzzz';
                return ctxA.localeCompare(ctxB);
            });

        case 'alpha-asc': // A-Z
            return sorted.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));

        case 'alpha-desc': // Z-A
            return sorted.sort((a, b) => b.text.toLowerCase().localeCompare(a.text.toLowerCase()));

        case 'none':
        default:
            // Maintain original order (creation order usually if array isn't shuffled)
            return sorted;
    }
};
