import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDate } from '../date-utils.js';

function simulateTimezone(date, offsetMinutes) {
  const adjust = offsetMinutes * 60_000;
  const keys = ['getFullYear', 'getMonth', 'getDate'];
  const originals = new Map();

  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(date, key);
    originals.set(key, descriptor || null);
    Object.defineProperty(date, key, {
      configurable: true,
      writable: true,
      value: function () {
        const adjusted = new Date(this.getTime() + adjust);
        switch (key) {
          case 'getFullYear':
            return adjusted.getUTCFullYear();
          case 'getMonth':
            return adjusted.getUTCMonth();
          case 'getDate':
            return adjusted.getUTCDate();
          default:
            return Reflect.apply(Date.prototype[key], this, []);
        }
      }
    });
  }

  return () => {
    for (const key of keys) {
      const descriptor = originals.get(key);
      if (descriptor) {
        Object.defineProperty(date, key, descriptor);
      } else {
        delete date[key];
      }
    }
  };
}

test('formatDate keeps the current day in neutral timezone', () => {
  const date = new Date(Date.UTC(2023, 4, 17, 12, 0, 0));
  assert.equal(formatDate(date), '2023-05-17');
});

test('formatDate respects positive timezone offsets', () => {
  const date = new Date(Date.UTC(2023, 4, 17, 22, 30, 0));
  const restore = simulateTimezone(date, 120); // UTC+2
  try {
    assert.equal(formatDate(date), '2023-05-18');
  } finally {
    restore();
  }
});

test('formatDate respects negative timezone offsets', () => {
  const date = new Date(Date.UTC(2023, 4, 18, 5, 30, 0));
  const restore = simulateTimezone(date, -420); // UTC-7
  try {
    assert.equal(formatDate(date), '2023-05-17');
  } finally {
    restore();
  }
});

test('formatDate always returns a YYYY-MM-DD string', () => {
  const date = new Date(Date.UTC(2023, 0, 5, 0, 0, 0));
  assert.match(formatDate(date), /^\d{4}-\d{2}-\d{2}$/);
});

test('throws for invalid dates', () => {
  assert.throws(() => formatDate(new Date('invalid')), {
    name: 'TypeError'
  });
});
