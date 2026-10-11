export type ComponentCategory = 'input' | 'output' | 'processing' | 'storage' | 'power';

export interface ComponentQuestion {
  id: string;
  name: string; // The correct component name
  title: string; // "What is this computer component?"
  riddle: string; // Kid-friendly clue, e.g. "I have lots of keys with letters and numbers to type your stories!"
  category: ComponentCategory;
  categoryLabel: string;
  options: string[]; // 4 options
  correctAnswer: string;
  explanation: string; // Simple 1-sentence explanation suitable for 10-11 year olds
  funFact: string; // Entertaining fact for curiosity
}

export type MascotMood = 
  | 'idle' 
  | 'thinking' 
  | 'cheering' 
  | 'super_genius' 
  | 'encouraging' 
  | 'celebrating';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAtScore?: number;
  conditionDescription: string;
}

export interface AnswerRecord {
  questionId: string;
  questionName: string;
  category: ComponentCategory;
  categoryLabel: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  attemptsUsed: number; // 1 or 2
  pointsEarned: number; // 10, 5, or 0
  explanation: string;
}

export type GameView = 'WELCOME' | 'PLAYING' | 'RESULTS';

export interface GameSettings {
  questionCount: 5 | 10 | 15;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  showHints: boolean;
}
