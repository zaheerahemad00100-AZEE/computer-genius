import { describe, it, expect } from 'vitest';
import { COMPONENT_QUESTIONS, BADGES, getPerformanceTitle } from '../data/questions';

describe('Component Questions Bank', () => {
  it('contains at least 15 comprehensive computer component questions', () => {
    expect(COMPONENT_QUESTIONS.length).toBeGreaterThanOrEqual(15);
  });

  it('each question has valid properties, exactly 4 unique options, and valid correct answer', () => {
    const validCategories = ['input', 'output', 'processing', 'storage', 'power'];
    const ids = new Set<string>();

    COMPONENT_QUESTIONS.forEach((q) => {
      // Unique ID
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);

      // Non-empty fields
      expect(q.id.length).toBeGreaterThan(0);
      expect(q.name.length).toBeGreaterThan(0);
      expect(q.title).toBe('What is this computer component?');
      expect(q.riddle.length).toBeGreaterThan(10);
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(q.funFact.length).toBeGreaterThan(10);

      // Category validation
      expect(validCategories).toContain(q.category);
      expect(q.categoryLabel.length).toBeGreaterThan(0);

      // Exactly 4 options
      expect(q.options).toHaveLength(4);
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(4);

      // Correct answer is one of the options
      expect(q.options).toContain(q.correctAnswer);
      expect(q.name).toBe(q.correctAnswer);
    });
  });

  it('covers all core required hardware components', () => {
    const requiredComponents = [
      'monitor',
      'keyboard',
      'mouse',
      'cpu',
      'printer',
      'speakers',
      'microphone',
      'webcam',
      'headphones',
      'scanner',
      'usb_drive',
      'ram',
      'hard_disk',
      'motherboard',
      'ups',
    ];

    const presentIds = COMPONENT_QUESTIONS.map((q) => q.id);
    requiredComponents.forEach((comp) => {
      expect(presentIds).toContain(comp);
    });
  });
});

describe('Badges and Performance Rank Evaluator', () => {
  it('defines 5 unique badges with valid properties', () => {
    expect(BADGES).toHaveLength(5);
    const badgeIds = new Set(BADGES.map((b) => b.id));
    expect(badgeIds.size).toBe(5);

    BADGES.forEach((b) => {
      expect(b.name.length).toBeGreaterThan(0);
      expect(b.description.length).toBeGreaterThan(0);
      expect(b.icon.length).toBeGreaterThan(0);
      expect(b.conditionDescription.length).toBeGreaterThan(0);
    });
  });

  it('calculates kid-friendly rank titles based on score tiers', () => {
    expect(getPerformanceTitle(150).title).toBe('Future Engineer Legend');
    expect(getPerformanceTitle(120).title).toBe('Computer Champion');
    expect(getPerformanceTitle(100).title).toBe('Tech Superstar');
    expect(getPerformanceTitle(60).title).toBe('Computer Learner');
    expect(getPerformanceTitle(30).title).toBe('Curious Explorer');
  });
});
