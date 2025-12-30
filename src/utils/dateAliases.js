import { addDays, format, nextDay, isBefore, startOfDay } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

// Helper to get formatted date string
const getFormattedDate = (date) => format(date, 'yyyy-MM-dd');

export const getDateAliases = () => {
    const today = new Date();

    // Basic aliases
    const aliases = {
        'today': getFormattedDate(today),
        'heute': getFormattedDate(today),
        'tomorrow': getFormattedDate(addDays(today, 1)),
        'morgen': getFormattedDate(addDays(today, 1)),
        'overmorrow': getFormattedDate(addDays(today, 2)), // rare but logical
        'übermorgen': getFormattedDate(addDays(today, 2)),
    };

    // Weekdays (English & German)
    // We want "next friday" logic. If today is Friday, "friday" usually means next friday or today? 
    // Standard convention: "friday" = upcoming friday.
    const daysEn = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const daysDe = ['sonntag', 'montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag', 'samstag'];

    daysEn.forEach((day, index) => {
        // Calculate next occurrence of this day
        // nextDay from date-fns finds the next specific day of week
        // Note: nextDay(today, 1) if today is Monday returns NEXT Monday (7 days later)? 
        // Let's verify date-fns behavior or simple logic. 
        // nextDay: "When it is the same day of the week, it returns the next week's day"
        let targetDate = nextDay(today, index);
        if (isBefore(targetDate, today)) {
            // Should not happen with nextDay, it always goes forward
        }

        // If today is Monday, strict "Monday" usually means today or next monday?
        // Let's assume standard "upcoming" behavior.

        aliases[day] = getFormattedDate(targetDate);
    });

    daysDe.forEach((day, index) => {
        let targetDate = nextDay(today, index);
        aliases[day] = getFormattedDate(targetDate);
    });

    return aliases;
};

// Check if a string is a valid alias and return the date
export function resolveDateAlias(input) {
    if (!input) return null;
    const lower = input.toLowerCase();
    const map = getDateAliases();
    return map[lower] || null;
}
