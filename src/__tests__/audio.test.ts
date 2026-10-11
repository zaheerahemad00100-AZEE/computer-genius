import { describe, it, expect } from 'vitest';
import { soundManager } from '../utils/audio';

describe('SoundEffectsManager Unit', () => {
  it('toggles and manages mute status correctly', () => {
    soundManager.setMuted(false);
    expect(soundManager.getMuted()).toBe(false);

    soundManager.setMuted(true);
    expect(soundManager.getMuted()).toBe(true);

    const toggled = soundManager.toggleMute();
    expect(toggled).toBe(false);
    expect(soundManager.getMuted()).toBe(false);
  });

  it('safely handles audio playback methods when muted or headless without throwing', () => {
    soundManager.setMuted(true);
    expect(() => {
      soundManager.playPop();
      soundManager.playCorrect();
      soundManager.playGentleBoing();
      soundManager.playBadgeUnlocked();
      soundManager.playStreakBonus();
      soundManager.playVictoryFanfare();
    }).not.toThrow();

    soundManager.setMuted(false);
  });
});
