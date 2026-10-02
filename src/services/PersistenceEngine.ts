// CODEINK V2 — Unified Persistence Engine
// High performance: Memory Cache + IndexedDB async mirror + localStorage safety fallback.
// Debounced writes to protect the main thread and avoid UI stutters.

import { MistakeRecord, StickyNote, UserHighlight } from '../types/notebook';

const DB_NAME = 'codeink_v2_db';
const DB_VERSION = 1;
const STORE_NAME = 'codeink_store';

class PersistenceEngine {
  private db: IDBDatabase | null = null;
  private dbReady: Promise<boolean>;
  private debounceTimers: Map<string, number> = new Map();

  constructor() {
    this.dbReady = this.initIndexedDB();
  }

  private async initIndexedDB(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return false;
    }

    return new Promise<boolean>((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };

        request.onsuccess = (event) => {
          this.db = (event.target as IDBOpenDBRequest).result;
          resolve(true);
        };

        request.onerror = () => {
          // Gracefully fallback to localStorage
          resolve(false);
        };
      } catch {
        resolve(false);
      }
    });
  }

  // Get item: checks localStorage first for immediate synchronous hydration
  public getSync<T>(key: string, defaultValue: T): T {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw);
      }
    } catch {
      // Fallback
    }
    return defaultValue;
  }

  // Debounced save to both localStorage and IndexedDB
  public save<T>(key: string, value: T, debounceMs = 300): void {
    // 1. Immediately schedule debounced write
    if (this.debounceTimers.has(key)) {
      window.clearTimeout(this.debounceTimers.get(key));
    }

    const timer = window.setTimeout(async () => {
      this.debounceTimers.delete(key);

      // LocalStorage write
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // quota exceeded or private mode, IndexedDB will handle
      }

      // IndexedDB write
      await this.dbReady;
      if (this.db) {
        try {
          const tx = this.db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(value, key);
        } catch {
          // Transaction error handled safely
        }
      }
    }, debounceMs);

    this.debounceTimers.set(key, timer);
  }

  // Immediate synchronous save (for critical actions like resolving mistake)
  public saveImmediate<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }

    this.dbReady.then(() => {
      if (this.db) {
        try {
          const tx = this.db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put(value, key);
        } catch {
          // ignore
        }
      }
    });
  }
}

export const persistenceEngine = new PersistenceEngine();
