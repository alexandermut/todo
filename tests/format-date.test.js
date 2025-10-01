import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDate } from '../date-utils.js';

test('formatDate keeps the current day in neutral timezone', () => {
  const date = new Date(Date.UTC(2023, 4, 17, 12, 0, 0));
  assert.equal(formatDate(date), '2023-05-17');
});

test('formatDate respects positive timezone offsets', () => {
  const date = new Date(Date.UTC(2023, 4, 17, 22, 30, 0));
  assert.equal(formatDate(date, { timeZoneOffsetMinutes: -120 }), '2023-05-18');
});

test('formatDate respects negative timezone offsets', () => {
  const date = new Date(Date.UTC(2023, 4, 18, 5, 30, 0));
  assert.equal(formatDate(date, { timeZoneOffsetMinutes: 420 }), '2023-05-17');
});

test('formatDate supports fractional timezone offsets', () => {
  const date = new Date(Date.UTC(2023, 0, 1, 18, 30, 0));
  assert.equal(formatDate(date, { timeZoneOffsetMinutes: -345 }), '2023-01-02');
});

test('formatDate defaults to the instance timezone offset', () => {
  const date = new Date(Date.UTC(2023, 4, 17, 22, 30, 0));
  date.getTimezoneOffset = () => -120;
  assert.equal(formatDate(date), '2023-05-18');
});

test('formatDate does not mutate the provided date', () => {
  const date = new Date(Date.UTC(2023, 4, 17, 12, 0, 0));
  const originalTime = date.getTime();
  formatDate(date, { timeZoneOffsetMinutes: -120 });
  assert.equal(date.getTime(), originalTime);
});

test('formatDate always returns a YYYY-MM-DD string', () => {
  const date = new Date(Date.UTC(2023, 0, 5, 0, 0, 0));
  assert.match(formatDate(date), /^\d{4}-\d{2}-\d{2}$/);
});

test('formatDate normalises historical dates across offsets', () => {
  const date = new Date(Date.UTC(1965, 0, 1, 3, 0, 0));
  assert.equal(formatDate(date, { timeZoneOffsetMinutes: 600 }), '1964-12-31');
});

test('throws for invalid dates', () => {
  assert.throws(() => formatDate(new Date('invalid')), {
    name: 'TypeError'
  });
});

test('throws when timezone offset is not finite', () => {
  const date = new Date(Date.UTC(2023, 0, 1, 0, 0, 0));
  assert.throws(() => formatDate(date, { timeZoneOffsetMinutes: Number.POSITIVE_INFINITY }), {
    name: 'TypeError',
    message: 'Expected a finite timezone offset'
  });
});

test('throws when timezone offset is NaN', () => {
  const date = new Date(Date.UTC(2023, 0, 1, 0, 0, 0));
  assert.throws(() => formatDate(date, { timeZoneOffsetMinutes: Number.NaN }), {
    name: 'TypeError',
    message: 'Expected a finite timezone offset'
  });
});
