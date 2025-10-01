const MS_PER_MINUTE = 60_000;

export function formatDate(date, { timeZoneOffsetMinutes } = {}) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('Expected a valid Date instance');
  }

  const offset = timeZoneOffsetMinutes ?? date.getTimezoneOffset();
  if (!Number.isFinite(offset)) {
    throw new TypeError('Expected a finite timezone offset');
  }

  const localTime = new Date(date.getTime() - offset * MS_PER_MINUTE);
  return localTime.toISOString().slice(0, 10);
}
