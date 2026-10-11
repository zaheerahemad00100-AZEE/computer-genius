import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadGameStorage,
  saveGameStorage,
  resetGameStorage,
  DEFAULT_STORAGE_DATA,
} from '../utils/storage';

describe('Storage Persistence & Defensive Schema', () => {
  beforeEach(() => {
    resetGameStorage();
  });

  it('returns default clean data when storage is empty', () => {
    const data = loadGameStorage();
    expect(data.highScore).toBe(0);
    expect(data.totalGamesPlayed).toBe(0);
    expect(data.unlockedBadgeIds).toEqual([]);
    expect(data.settings.questionCount).toBe(15);
    expect(data.settings.soundEnabled).toBe(true);
    expect(data.settings.voiceEnabled).toBe(true);
  });

  it('saves and reloads game data correctly', () => {
    const saveSuccess = saveGameStorage({
      highScore: 120,
      bestStreak: 4,
      totalGamesPlayed: 2,
      unlockedBadgeIds: ['beginner_explorer', 'keyboard_ninja'],
      adaptiveLevel: 'master',
    });
    expect(saveSuccess).toBe(true);

    const reloaded = loadGameStorage();
    expect(reloaded.highScore).toBe(120);
    expect(reloaded.bestStreak).toBe(4);
    expect(reloaded.totalGamesPlayed).toBe(2);
    expect(reloaded.unlockedBadgeIds).toContain('beginner_explorer');
    expect(reloaded.unlockedBadgeIds).toContain('keyboard_ninja');
    expect(reloaded.adaptiveLevel).toBe('master');
  });

  it('handles corrupted JSON in localStorage gracefully without throwing', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('techverse_game_data_v1', '{invalid-json--malformed!#@$');
      const loaded = loadGameStorage();
      expect(loaded).toEqual(DEFAULT_STORAGE_DATA);
    }
  });

  it('sanitizes and defends against invalid data types (e.g., negative scores, non-array badges)', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(
        'techverse_game_data_v1',
        JSON.stringify({
          highScore: -50,
          bestStreak: 'invalid_string',
          unlockedBadgeIds: 12345,
          settings: {
            questionCount: 999, // invalid question count
            soundEnabled: 'not-a-bool',
          },
        })
      );
      const loaded = loadGameStorage();
      expect(loaded.highScore).toBe(0); // Clamped to min 0
      expect(loaded.bestStreak).toBe(0); // Defended NaN/string
      expect(loaded.unlockedBadgeIds).toEqual([]); // Defended non-array
      expect(loaded.settings.questionCount).toBe(15); // Fallback to 15
      expect(loaded.settings.soundEnabled).toBe(true); // Fallback to default
    }
  });

  it('resetGameStorage clears the stored record', () => {
    saveGameStorage({ highScore: 150 });
    expect(loadGameStorage().highScore).toBe(150);

    resetGameStorage();
    expect(loadGameStorage().highScore).toBe(0);
  });
});
