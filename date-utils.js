const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 86_400_000;

/**
 * Convert a Date into a local calendar day string (`YYYY-MM-DD`).
 *
 * @param {Date} date - The date to normalise.
 * @param {{ timeZoneOffsetMinutes?: number }} [options] - Optional override for the
 *   timezone offset in minutes. Positive values represent locations behind UTC.
 * @returns {string} The ISO formatted date for the local day.
 */
export function formatDate(date, { timeZoneOffsetMinutes } = {}) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('Expected a valid Date instance');
  }

  const offset = timeZoneOffsetMinutes ?? date.getTimezoneOffset();
  if (!Number.isFinite(offset)) {
    throw new TypeError('Expected a finite timezone offset');
  }

  const localTimeMs = date.getTime() - offset * MS_PER_MINUTE;
  const normalizedTime = Math.floor(localTimeMs / MS_PER_DAY) * MS_PER_DAY;
  const normalizedDate = new Date(normalizedTime);

  return normalizedDate.toISOString().slice(0, 10);
}
