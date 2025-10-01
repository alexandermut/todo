import test from 'node:test';
import assert from 'node:assert/strict';
import { createStorage } from '../storage.js';

test('storage works with functional localStorage', () => {
  const backend = () => {
    const store = new Map();
    return {
      setItem(key, value) { store.set(key, value); },
      getItem(key) { return store.has(key) ? store.get(key) : null; },
      removeItem(key) { store.delete(key); }
    };
  };
  const storage = createStorage(backend);
  storage.set('foo', 'bar');
  assert.equal(storage.get('foo'), 'bar');
  storage.remove('foo');
  assert.equal(storage.get('foo'), null);
});

test('storage falls back to memory when backend throws', () => {
  const backend = () => ({
    setItem() { throw new Error('nope'); },
    getItem() { throw new Error('nope'); },
    removeItem() { throw new Error('nope'); }
  });
  const storage = createStorage(backend);
  storage.set('foo', 'bar');
  assert.equal(storage.get('foo'), 'bar');
  storage.remove('foo');
  assert.equal(storage.get('foo'), null);
});
