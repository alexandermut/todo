export function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError('Expected a valid Date instance');
  }
  const utcMidnight = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ));
  return utcMidnight.toISOString().slice(0, 10);
}
