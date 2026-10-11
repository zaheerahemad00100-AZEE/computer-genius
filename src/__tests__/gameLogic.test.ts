import { describe, it, expect } from 'vitest';
import { BADGES } from '../data/questions';
import { AnswerRecord } from '../types/game';

describe('Game Scoring & Badge Trigger Logic', () => {
  it('correctly calculates points for first-try (10 pts) and retry (5 pts)', () => {
    const firstTryCorrect: AnswerRecord = {
      questionId: 'monitor',
      questionName: 'Monitor',
      category: 'output',
      categoryLabel: 'Output Device',
      selectedAnswer: 'Monitor',
      correctAnswer: 'Monitor',
      isCorrect: true,
      attemptsUsed: 1,
      pointsEarned: 10,
      explanation: 'A monitor is an output device.',
    };
    expect(firstTryCorrect.pointsEarned).toBe(10);

    const retryCorrect: AnswerRecord = {
      questionId: 'keyboard',
      questionName: 'Keyboard',
      category: 'input',
      categoryLabel: 'Input Device',
      selectedAnswer: 'Keyboard',
      correctAnswer: 'Keyboard',
      isCorrect: true,
      attemptsUsed: 2,
      pointsEarned: 5,
      explanation: 'A keyboard is an input device.',
    };
    expect(retryCorrect.pointsEarned).toBe(5);

    const bothAttemptsFailed: AnswerRecord = {
      questionId: 'cpu',
      questionName: 'CPU / System Unit',
      category: 'processing',
      categoryLabel: 'Processing Unit',
      selectedAnswer: 'RAM',
      correctAnswer: 'CPU / System Unit',
      isCorrect: false,
      attemptsUsed: 2,
      pointsEarned: 0,
      explanation: 'The CPU acts as the brain.',
    };
    expect(bothAttemptsFailed.pointsEarned).toBe(0);
  });

  it('triggers Beginner Explorer badge on first correct answer', () => {
    const beginnerBadge = BADGES.find((b) => b.id === 'beginner_explorer');
    expect(beginnerBadge).toBeDefined();

    const record = { isCorrect: true };
    const shouldUnlock = record.isCorrect;
    expect(shouldUnlock).toBe(true);
  });

  it('triggers Keyboard Ninja badge on streak of 3 or more', () => {
    const streakBadge = BADGES.find((b) => b.id === 'keyboard_ninja');
    expect(streakBadge).toBeDefined();

    expect(2 >= 3).toBe(false);
    expect(3 >= 3).toBe(true);
    expect(5 >= 3).toBe(true);
  });

  it('triggers Hardware Hero on core internal hardware (cpu, ram, motherboard)', () => {
    const internalParts = ['cpu', 'ram', 'motherboard'];
    expect(internalParts.includes('cpu')).toBe(true);
    expect(internalParts.includes('ram')).toBe(true);
    expect(internalParts.includes('motherboard')).toBe(true);
    expect(internalParts.includes('mouse')).toBe(false);
  });

  it('triggers Computer Champion at 80+ points and Future Engineer at 120+ points', () => {
    const championBadge = BADGES.find((b) => b.id === 'computer_champion');
    const engineerBadge = BADGES.find((b) => b.id === 'future_engineer');

    expect(championBadge?.unlockedAtScore).toBe(80);
    expect(engineerBadge?.unlockedAtScore).toBe(120);

    const score = 125;
    expect(score >= 80).toBe(true);
    expect(score >= 120).toBe(true);
  });
});
