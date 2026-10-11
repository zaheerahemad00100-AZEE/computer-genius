/**
 * Safe LocalStorage persistence utility for TechVerse: The Talking Computer Adventure.
 * Resilient against private browsing restrictions, corrupted JSON, and quota exceeded errors.
 */

import { ComponentCategory, GameSettings } from '../types/game';

export interface CategoryMasteryStats {
  attempted: number;
  correct: number;
}

export interface TechVerseStorageData {
  highScore: number;
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  bestStreak: number;
  unlockedBadgeIds: string[];
  categoryMastery: Record<ComponentCategory, CategoryMasteryStats>;
  settings: GameSettings;
  adaptiveLevel: 'beginner' | 'explorer' | 'master';
  lastPlayedAt: string | null;
}

const STORAGE_KEY = 'techverse_game_data_v1';

export const DEFAULT_STORAGE_DATA: TechVerseStorageData = {
  highScore: 0,
  totalGamesPlayed: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  bestStreak: 0,
  unlockedBadgeIds: [],
  categoryMastery: {
    input: { attempted: 0, correct: 0 },
    output: { attempted: 0, correct: 0 },
    processing: { attempted: 0, correct: 0 },
    storage: { attempted: 0, correct: 0 },
    power: { attempted: 0, correct: 0 },
  },
  settings: {
    questionCount: 15,
    soundEnabled: true,
    voiceEnabled: true,
    showHints: true,
  },
  adaptiveLevel: 'explorer',
  lastPlayedAt: null,
};

let memoryStorage: Record<string, string> = {};

function getRawStorageItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key);
      if (val !== null) return val;
    }
  } catch {}
  return memoryStorage[key] ?? null;
}

function setRawStorageItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch {}
  memoryStorage[key] = value;
}

function removeRawStorageItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(key);
    }
  } catch {}
  delete memoryStorage[key];
}

/**
 * Safely reads and validates data from storage.
 * If data is corrupted, missing, or throws an exception, returns default clean data.
 */
export function loadGameStorage(): TechVerseStorageData {
  try {
    const raw = getRawStorageItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_STORAGE_DATA };
    }

    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) {
      return { ...DEFAULT_STORAGE_DATA };
    }

    // Defensive parsing with schema validation
    return {
      highScore: typeof parsed.highScore === 'number' && !isNaN(parsed.highScore) ? Math.max(0, parsed.highScore) : 0,
      totalGamesPlayed: typeof parsed.totalGamesPlayed === 'number' && !isNaN(parsed.totalGamesPlayed) ? Math.max(0, parsed.totalGamesPlayed) : 0,
      totalQuestionsAnswered: typeof parsed.totalQuestionsAnswered === 'number' && !isNaN(parsed.totalQuestionsAnswered) ? Math.max(0, parsed.totalQuestionsAnswered) : 0,
      totalCorrectAnswers: typeof parsed.totalCorrectAnswers === 'number' && !isNaN(parsed.totalCorrectAnswers) ? Math.max(0, parsed.totalCorrectAnswers) : 0,
      bestStreak: typeof parsed.bestStreak === 'number' && !isNaN(parsed.bestStreak) ? Math.max(0, parsed.bestStreak) : 0,
      unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds.filter((id: unknown) => typeof id === 'string') : [],
      categoryMastery: sanitizeCategoryMastery(parsed.categoryMastery),
      settings: sanitizeSettings(parsed.settings),
      adaptiveLevel: ['beginner', 'explorer', 'master'].includes(parsed.adaptiveLevel) ? parsed.adaptiveLevel : 'explorer',
      lastPlayedAt: typeof parsed.lastPlayedAt === 'string' ? parsed.lastPlayedAt : null,
    };
  } catch {
    // If JSON parse or storage read fails, gracefully return default
    return { ...DEFAULT_STORAGE_DATA };
  }
}

/**
 * Safely writes data to storage.
 */
export function saveGameStorage(data: Partial<TechVerseStorageData>): boolean {
  try {
    const current = loadGameStorage();
    const merged: TechVerseStorageData = {
      ...current,
      ...data,
      lastPlayedAt: new Date().toISOString(),
    };
    setRawStorageItem(STORAGE_KEY, JSON.stringify(merged));
    return true;
  } catch {
    // Fails gracefully if storage quota exceeded
    return false;
  }
}

/**
 * Reset storage cleanly.
 */
export function resetGameStorage(): boolean {
  try {
    removeRawStorageItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

function sanitizeCategoryMastery(raw: unknown): Record<ComponentCategory, CategoryMasteryStats> {
  const categories: ComponentCategory[] = ['input', 'output', 'processing', 'storage', 'power'];
  const result: Record<ComponentCategory, CategoryMasteryStats> = { ...DEFAULT_STORAGE_DATA.categoryMastery };

  if (typeof raw !== 'object' || raw === null) {
    return result;
  }

  const obj = raw as Record<string, unknown>;
  categories.forEach((cat) => {
    if (typeof obj[cat] === 'object' && obj[cat] !== null) {
      const item = obj[cat] as Record<string, unknown>;
      result[cat] = {
        attempted: typeof item.attempted === 'number' && !isNaN(item.attempted) ? Math.max(0, item.attempted) : 0,
        correct: typeof item.correct === 'number' && !isNaN(item.correct) ? Math.max(0, item.correct) : 0,
      };
    }
  });

  return result;
}

function sanitizeSettings(raw: unknown): GameSettings {
  if (typeof raw !== 'object' || raw === null) {
    return { ...DEFAULT_STORAGE_DATA.settings };
  }

  const obj = raw as Record<string, unknown>;
  const questionCount = [5, 10, 15].includes(obj.questionCount as number)
    ? (obj.questionCount as 5 | 10 | 15)
    : 15;

  return {
    questionCount,
    soundEnabled: typeof obj.soundEnabled === 'boolean' ? obj.soundEnabled : true,
    voiceEnabled: typeof obj.voiceEnabled === 'boolean' ? obj.voiceEnabled : true,
    showHints: typeof obj.showHints === 'boolean' ? obj.showHints : true,
  };
}
