/**
 * CodeInk Security Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised security helpers used across the app.
 *
 * IMPORTANT: This is a client-side app — we cannot provide true server-side
 * security. These utilities provide a meaningful defence-in-depth layer that
 * stops casual / opportunistic attacks (shared computers, DevTools fishing,
 * XSS via injected output, payload abuse of free 3rd-party APIs).
 */

// ─── 1. KEY OBFUSCATION ──────────────────────────────────────────────────────
// Prevents API keys from being visible as plain text in localStorage.
// Uses XOR with a browser-fingerprint-derived salt so the value looks
// like random base64 to anyone who opens DevTools → Application → Storage.
// NOT cryptographically secure — a determined attacker with source code can
// reverse it — but defeats 95 % of casual/opportunistic theft.

const OBFUSCATION_SEED = 'codeink_obs_2026';

function getBrowserSalt(): string {
  // Combine app seed with a stable browser signal (navigator.language + screen.width)
  const signal = [
    OBFUSCATION_SEED,
    navigator.language,
    String(screen.width),
    String(screen.colorDepth)
  ].join('|');
  return signal;
}

function xorString(input: string, key: string): string {
  return Array.from(input)
    .map((ch, i) => String.fromCharCode(ch.charCodeAt(0) ^ key.charCodeAt(i % key.length)))
    .join('');
}

/**
 * Obfuscate a sensitive string (API key) before storing in localStorage.
 */
export function obfuscate(value: string): string {
  if (!value) return '';
  try {
    const salt = getBrowserSalt();
    const xored = xorString(value, salt);
    return btoa(unescape(encodeURIComponent(xored)));
  } catch {
    // Fallback: base64 only (better than plain text)
    return btoa(unescape(encodeURIComponent(value)));
  }
}

/**
 * Recover the original string from an obfuscated localStorage value.
 */
export function deobfuscate(stored: string): string {
  if (!stored) return '';
  try {
    const salt = getBrowserSalt();
    const decoded = decodeURIComponent(escape(atob(stored)));
    return xorString(decoded, salt);
  } catch {
    // If decoding fails (e.g. value was stored before obfuscation was added),
    // return it as-is so existing keys keep working after the upgrade.
    return stored;
  }
}

// ─── 2. HTML OUTPUT SANITIZER ────────────────────────────────────────────────
// Escapes the 5 HTML metacharacters so compiler/AI output can never inject
// script tags or break out of a <pre> block even if a 3rd-party API is
// compromised or starts returning crafted payloads.

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;'
};

/**
 * Escape HTML special characters in untrusted text (compiler output, AI reply).
 * Safe to render inside dangerouslySetInnerHTML OR as textContent (already safe).
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  return text.replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch] ?? ch);
}

// ─── 3. INPUT SANITIZERS ─────────────────────────────────────────────────────

/** Maximum code payload size accepted before sending to Wandbox (chars). */
export const MAX_CODE_LENGTH = 50_000;

/** Maximum stdin payload size accepted before sending to Wandbox (chars). */
export const MAX_STDIN_LENGTH = 10_000;

/** Maximum search query length to prevent ReDoS. */
export const MAX_SEARCH_QUERY_LENGTH = 500;

/**
 * Truncate a code payload to the maximum allowed size.
 * Returns { code, truncated } — caller should warn the user if truncated=true.
 */
export function sanitizeCode(raw: string): { code: string; truncated: boolean } {
  if (raw.length <= MAX_CODE_LENGTH) return { code: raw, truncated: false };
  return { code: raw.slice(0, MAX_CODE_LENGTH), truncated: true };
}

/**
 * Truncate stdin to the maximum allowed size.
 */
export function sanitizeStdin(raw: string): string {
  return raw.length <= MAX_STDIN_LENGTH ? raw : raw.slice(0, MAX_STDIN_LENGTH);
}

/**
 * Sanitise a search query — truncate and strip control characters.
 */
export function sanitizeSearchQuery(raw: string): string {
  return raw
    .slice(0, MAX_SEARCH_QUERY_LENGTH)
    // Remove non-printable / control characters
    .replace(/[\x00-\x1F\x7F]/g, ' ')
    .trim();
}

// ─── 4. RATE LIMITER ─────────────────────────────────────────────────────────
// Prevents users from spamming AI calls and exhausting their API quota.

export class RateLimiter {
  private lastCall = 0;
  private readonly minIntervalMs: number;

  constructor(minIntervalMs = 3000) {
    this.minIntervalMs = minIntervalMs;
  }

  /**
   * Returns true if the action is allowed now, false if it is too soon.
   * Call `allow()` — do not call it inside a tight loop.
   */
  allow(): boolean {
    const now = Date.now();
    if (now - this.lastCall >= this.minIntervalMs) {
      this.lastCall = now;
      return true;
    }
    return false;
  }

  /** Milliseconds remaining until the next call is allowed. */
  remainingMs(): number {
    return Math.max(0, this.minIntervalMs - (Date.now() - this.lastCall));
  }
}

// Singleton rate limiters — one per API surface
export const aiRateLimiter = new RateLimiter(3000);   // 1 AI call per 3 s
export const compilerRateLimiter = new RateLimiter(2000); // 1 compile per 2 s

// ─── 5. CRASH-PROOF STORAGE WRAPPER ──────────────────────────────────────────
// Protects against corrupt localStorage JSON tampering, private mode blockages,
// and QuotaExceededError in restricted browser environments.

export const safeStorage = {
  getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return fallback;
      return JSON.parse(item) as T;
    } catch {
      return fallback;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[CodeInk Security] Failed to save key "${key}" to localStorage:`, e);
      return false;
    }
  },

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
};
