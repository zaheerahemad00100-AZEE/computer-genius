import { describe, it, expect } from 'vitest';
import {
  cleanSpeechText,
  getNonRepeatingDialogue,
  shuffleArray,
  ENGLISH_CORRECT_MESSAGES,
  ENGLISH_NEXT_TRANSITIONS,
  ENGLISH_INCORRECT_MESSAGES,
} from '../data/questions';
import { speechManager } from '../utils/speech';

describe('Speech & Dialogue Helpers', () => {
  it('cleanSpeechText strips emojis so speech synthesis pronounces natural English', () => {
    const rawWithEmojis = 'Wow! Brilliant answer! You just earned ten points! 🌟👏';
    const cleaned = cleanSpeechText(rawWithEmojis);
    expect(cleaned).toBe('Wow! Brilliant answer! You just earned ten points!');
    expect(cleaned).not.toContain('🌟');
    expect(cleaned).not.toContain('👏');
  });

  it('cleanSpeechText leaves pure English untouched', () => {
    const pureEnglish = "Eyes on the screen! Here comes your next question!";
    expect(cleanSpeechText(pureEnglish)).toBe(pureEnglish);
  });

  it('getNonRepeatingDialogue avoids consecutive duplicate lines when multiple options exist', () => {
    const list = ['Option A', 'Option B', 'Option C'];
    const chosen = getNonRepeatingDialogue(list, 'Option A');
    expect(chosen).not.toBe('Option A');
    expect(list).toContain(chosen);
  });

  it('shuffleArray maintains all items and length', () => {
    const original = [1, 2, 3, 4, 5, 6, 7];
    const shuffled = shuffleArray(original);
    expect(shuffled).toHaveLength(original.length);
    original.forEach((item) => {
      expect(shuffled).toContain(item);
    });
  });

  it('dialogue banks have non-empty lists of expressive English strings', () => {
    expect(ENGLISH_CORRECT_MESSAGES.length).toBeGreaterThanOrEqual(5);
    expect(ENGLISH_NEXT_TRANSITIONS.length).toBeGreaterThanOrEqual(4);
    expect(ENGLISH_INCORRECT_MESSAGES.length).toBeGreaterThanOrEqual(4);

    ENGLISH_CORRECT_MESSAGES.forEach((msg) => {
      expect(msg.length).toBeGreaterThan(0);
    });
  });
});

describe('SpeechManager Unit', () => {
  it('manages mute state properly', () => {
    speechManager.setMuted(true);
    expect(speechManager.getMuted()).toBe(true);

    speechManager.setMuted(false);
    expect(speechManager.getMuted()).toBe(false);

    const toggled = speechManager.toggleMute();
    expect(toggled).toBe(true);
    expect(speechManager.getMuted()).toBe(true);

    speechManager.setMuted(false);
  });

  it('safely handles speak when muted or in test environment without throwing', () => {
    speechManager.setMuted(true);
    let finished = false;
    speechManager.speak('Test speech', {
      onEnd: () => {
        finished = true;
      },
    });
    expect(finished).toBe(true);
    speechManager.setMuted(false);
  });
});
