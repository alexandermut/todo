export function createStorage(getLocalStorage = () => window.localStorage) {
  const memory = new Map();
  let available = true;
  let local;
  try {
    local = getLocalStorage();
    const testKey = '__todotxt_test__';
    local.setItem(testKey, '1');
    local.removeItem(testKey);
  } catch (error) {
    console.warn('Lokaler Speicher nicht verfügbar, weiche auf In-Memory-Store aus.', error);
    available = false;
  }
  const api = {
    get(key) {
      if (available) {
        try {
          return local.getItem(key);
        } catch (error) {
          console.warn('Lesen aus localStorage fehlgeschlagen, verwende Fallback.', error);
          available = false;
        }
      }
      return memory.has(key) ? memory.get(key) : null;
    },
    set(key, value) {
      if (available) {
        try {
          local.setItem(key, value);
          memory.set(key, value);
          return;
        } catch (error) {
          console.warn('Schreiben in localStorage fehlgeschlagen, verwende Fallback.', error);
          available = false;
        }
      }
      memory.set(key, value);
    },
    remove(key) {
      if (available) {
        try {
          local.removeItem(key);
        } catch (error) {
          console.warn('Löschen in localStorage fehlgeschlagen, verwende Fallback.', error);
          available = false;
        }
      }
      memory.delete(key);
    }
  };
  return api;
}
