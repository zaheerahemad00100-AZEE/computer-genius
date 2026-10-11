import { ComponentQuestion, Badge } from '../types/game';

export const COMPONENT_QUESTIONS: ComponentQuestion[] = [
  {
    id: 'monitor',
    name: 'Monitor',
    title: 'What is this computer component?',
    riddle: 'I am the screen that displays pictures, games, and videos so your eyes can see what the computer is doing!',
    category: 'output',
    categoryLabel: 'Output Device',
    options: ['Monitor', 'Keyboard', 'Scanner', 'Printer'],
    correctAnswer: 'Monitor',
    explanation: 'A monitor is an output device that displays images, videos, and text on a screen.',
    funFact: 'Early computer monitors could only show green text on black screens!',
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    title: 'What is this computer component?',
    riddle: 'I have rows of buttons with letters, numbers, and a long spacebar used for typing your stories and homework!',
    category: 'input',
    categoryLabel: 'Input Device',
    options: ['Mouse', 'Keyboard', 'Motherboard', 'Speakers'],
    correctAnswer: 'Keyboard',
    explanation: 'A keyboard is an input device used to enter text, numbers, and commands into the computer.',
    funFact: 'The QWERTY keyboard layout was invented back in 1873 for old mechanical typewriters!',
  },
  {
    id: 'mouse',
    name: 'Mouse',
    title: 'What is this computer component?',
    riddle: 'I fit right in your hand! You slide me across your desk and click my buttons to point at things on the screen.',
    category: 'input',
    categoryLabel: 'Input Device',
    options: ['Webcam', 'Microphone', 'Mouse', 'USB Flash Drive'],
    correctAnswer: 'Mouse',
    explanation: 'A mouse is a handheld pointing device used to click, drag, and select items on your screen.',
    funFact: 'The very first computer mouse was made of wood and had only one metal button!',
  },
  {
    id: 'cpu',
    name: 'CPU / System Unit',
    title: 'What is this computer component?',
    riddle: 'I am known as the "Brain of the Computer" inside the tower case, processing all instructions and math at lightning speed!',
    category: 'processing',
    categoryLabel: 'Processing Unit',
    options: ['CPU / System Unit', 'Hard Disk / SSD', 'UPS', 'Monitor'],
    correctAnswer: 'CPU / System Unit',
    explanation: 'The CPU (Central Processing Unit) acts as the brain of the computer, executing calculations and instructions.',
    funFact: 'A modern CPU can perform billions of math calculations in a single second!',
  },
  {
    id: 'printer',
    name: 'Printer',
    title: 'What is this computer component?',
    riddle: 'I take your digital drawings, photos, and essays from the computer and put them onto real sheets of paper!',
    category: 'output',
    categoryLabel: 'Output Device',
    options: ['Scanner', 'Printer', 'Speakers', 'RAM'],
    correctAnswer: 'Printer',
    explanation: 'A printer is an output device that transfers digital text and graphics onto paper.',
    funFact: 'Some special modern 3D printers can even print toys, chocolate, and houses!',
  },
  {
    id: 'speakers',
    name: 'Speakers',
    title: 'What is this computer component?',
    riddle: 'We play loud music, game sound effects, and voices so everyone in the room can dance and listen!',
    category: 'output',
    categoryLabel: 'Output Device',
    options: ['Microphone', 'Headphones', 'Speakers', 'Motherboard'],
    correctAnswer: 'Speakers',
    explanation: 'Speakers are output devices that produce sound waves so you can hear audio out loud.',
    funFact: 'Speakers create sound by vibrating tiny cones made of paper, plastic, or fabric!',
  },
  {
    id: 'microphone',
    name: 'Microphone',
    title: 'What is this computer component?',
    riddle: 'Speak into me! I capture your singing, voice chats, and podcast audio and send them straight into the computer.',
    category: 'input',
    categoryLabel: 'Input Device',
    options: ['Speakers', 'Microphone', 'Webcam', 'UPS'],
    correctAnswer: 'Microphone',
    explanation: 'A microphone is an input device that converts sound waves from your voice into digital audio signals.',
    funFact: 'Microphones are also built into smart assistants that listen to voice commands!',
  },
  {
    id: 'webcam',
    name: 'Webcam',
    title: 'What is this computer component?',
    riddle: 'Smile for the camera! I sit on top of your monitor to capture live video of you during online classes and video calls.',
    category: 'input',
    categoryLabel: 'Input Device',
    options: ['Scanner', 'Monitor', 'Webcam', 'USB Flash Drive'],
    correctAnswer: 'Webcam',
    explanation: 'A webcam is an input video camera that captures live video and feeds it into the computer.',
    funFact: 'The first webcam was created by university scientists in 1991 just to check if the coffee pot had coffee!',
  },
  {
    id: 'headphones',
    name: 'Headphones',
    title: 'What is this computer component?',
    riddle: 'Slip me over your ears! I let you listen to your favorite songs and games without bothering anyone around you.',
    category: 'output',
    categoryLabel: 'Output Device',
    options: ['Headphones', 'Microphone', 'Keyboard', 'Mouse'],
    correctAnswer: 'Headphones',
    explanation: 'Headphones are personal output audio devices worn over or in your ears for private listening.',
    funFact: 'Wearing headphones keeps your sounds private so you can focus on learning without background noise!',
  },
  {
    id: 'scanner',
    name: 'Scanner',
    title: 'What is this computer component?',
    riddle: 'Place a paper drawing on my glass flatbed, close my lid, and watch my glowing light beam turn it into a digital computer file!',
    category: 'input',
    categoryLabel: 'Input Device',
    options: ['Printer', 'Scanner', 'Monitor', 'RAM'],
    correctAnswer: 'Scanner',
    explanation: 'A scanner is an input device that digitizes printed documents and pictures into images on the computer.',
    funFact: 'Scanners use optical light sensors to read every tiny dot on a paper drawing!',
  },
  {
    id: 'usb_drive',
    name: 'USB Flash Drive',
    title: 'What is this computer component?',
    riddle: 'I am a pocket-sized thumb drive with a shiny metal plug! Plug me into any computer to save and carry your files anywhere.',
    category: 'storage',
    categoryLabel: 'Portable Storage',
    options: ['RAM', 'USB Flash Drive', 'Motherboard', 'Webcam'],
    correctAnswer: 'USB Flash Drive',
    explanation: 'A USB flash drive is a portable storage device used for storing and transferring digital files.',
    funFact: 'A tiny thumb drive today can hold thousands of books and entire movie libraries!',
  },
  {
    id: 'ram',
    name: 'RAM',
    title: 'What is this computer component?',
    riddle: 'I look like a green stick with shiny gold teeth! I hold high-speed temporary memory so your computer can run games smoothly.',
    category: 'processing',
    categoryLabel: 'Temporary Memory',
    options: ['Hard Disk / SSD', 'RAM', 'UPS', 'Printer'],
    correctAnswer: 'RAM',
    explanation: 'RAM (Random Access Memory) is super-fast temporary memory used by the computer while running apps and games.',
    funFact: 'When you turn off the computer, everything in RAM is cleared like wiping a clean chalkboard!',
  },
  {
    id: 'hard_disk',
    name: 'Hard Disk / SSD',
    title: 'What is this computer component?',
    riddle: 'I am the permanent storage vault! All your saved games, photos, videos, and operating system stay safe inside me forever.',
    category: 'storage',
    categoryLabel: 'Permanent Storage',
    options: ['RAM', 'Hard Disk / SSD', 'Keyboard', 'Speakers'],
    correctAnswer: 'Hard Disk / SSD',
    explanation: 'A Hard Disk or SSD stores your files permanently, even when the computer is turned off.',
    funFact: 'Solid State Drives (SSDs) have no moving parts and read files much faster than older spinning hard disks!',
  },
  {
    id: 'motherboard',
    name: 'Motherboard',
    title: 'What is this computer component?',
    riddle: 'I am the big main circuit board! I connect the CPU, RAM, graphics card, and storage together like a busy bustling highway.',
    category: 'processing',
    categoryLabel: 'Main Circuit Board',
    options: ['Motherboard', 'UPS', 'Scanner', 'Monitor'],
    correctAnswer: 'Motherboard',
    explanation: 'The motherboard is the main printed circuit board that connects all computer components together.',
    funFact: 'Without the motherboard, the other computer parts could not talk or communicate with each other!',
  },
  {
    id: 'ups',
    name: 'UPS',
    title: 'What is this computer component?',
    riddle: 'If the electric lights suddenly go out during a thunderstorm, my backup battery keeps the computer running so you don’t lose your work!',
    category: 'power',
    categoryLabel: 'Power Backup',
    options: ['CPU / System Unit', 'Speakers', 'UPS', 'Motherboard'],
    correctAnswer: 'UPS',
    explanation: 'A UPS (Uninterruptible Power Supply) provides battery backup power when electrical power fails.',
    funFact: 'UPS stands for Uninterruptible Power Supply — it protects sensitive computer parts from sudden power surges!',
  },
];

// English Game Show Host Dialogue Collections
export const ENGLISH_CORRECT_MESSAGES = [
  "Wow! Brilliant answer! You just earned ten points! 🌟",
  "Fantastic! You're becoming a true Computer Genius! 🚀",
  "Absolutely correct! Give yourself a big round of applause! 👏",
  "Amazing work! You're on fire today! 🔥",
  "Superb! Let's move on to your next challenge! 💥",
  "Outstanding! Your brain is faster than a gaming computer! ⚡",
  "Spot on, champion! That was pure genius! 🏆",
  "Yes! Exactly right! You are a Hardware Hero! 🤖",
];

export const ENGLISH_NEXT_TRANSITIONS = [
  "Wonderful! And now, here's your next question!",
  "Keep that brain power going! Your next challenge is here!",
  "Let's find out if you can answer the next one!",
  "Ready for another challenge? Here comes your next question!",
  "Moving forward! Let's see what comes next!",
  "Eyes on the screen! Here comes your next question!",
];

export const ENGLISH_INCORRECT_MESSAGES = [
  "Oops! No worries, champion. Give it another try! 😊",
  "Not quite! Take your time and think again! 💡",
  "Every mistake helps you learn. You've got this! 🌈",
  "Come on, Computer Genius! One more try! 🤖",
  "Almost there! Take another close look! 🔍",
  "Good effort! Give it one more shot! 💪",
];

export const ENGLISH_QUESTION_ANNOUNCEMENTS = [
  "Get ready! Your next question is on the screen!",
  "Here comes your next exciting computer challenge!",
  "Eyes on the screen! Can you identify this computer component?",
  "Are you ready, champion? Let's play!",
  "Look closely at the image! What do we have here?",
  "Take a look at the screen! Can you name this component?",
];

/**
 * Returns a random dialogue from a list, ensuring no immediate repetition
 */
export function getNonRepeatingDialogue(list: string[], lastUsed?: string): string {
  const pool = list.filter((item) => item !== lastUsed);
  if (pool.length === 0) return list[Math.floor(Math.random() * list.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Strips emoji characters so speech synthesis speaks natural English phrases
 */
export function cleanSpeechText(text: string): string {
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .trim();
}

export const BADGES: Badge[] = [
  {
    id: 'beginner_explorer',
    name: 'Beginner Explorer',
    description: 'Answered your first question correctly! Welcome to the computer world.',
    icon: 'Compass',
    color: 'from-blue-500 to-indigo-600',
    conditionDescription: 'Answer 1 question correctly',
  },
  {
    id: 'keyboard_ninja',
    name: 'Keyboard Ninja',
    description: 'Quick reflexes! Mastered 3 correct answers in a row without breaking a sweat.',
    icon: 'Zap',
    color: 'from-amber-500 to-orange-600',
    conditionDescription: 'Reach a 3-question streak',
  },
  {
    id: 'hardware_hero',
    name: 'Hardware Hero',
    description: 'Identified key internal components like CPU, RAM, or Motherboard!',
    icon: 'Cpu',
    color: 'from-emerald-500 to-teal-600',
    conditionDescription: 'Answer internal hardware questions',
  },
  {
    id: 'computer_champion',
    name: 'Computer Champion',
    description: 'Racked up 80+ points! You understand how computers see, think, and store data.',
    icon: 'Trophy',
    color: 'from-purple-500 to-pink-600',
    unlockedAtScore: 80,
    conditionDescription: 'Earn 80 or more points',
  },
  {
    id: 'future_engineer',
    name: 'Future Engineer',
    description: 'Scored 120+ points! You are officially ready to build and fix computers!',
    icon: 'Rocket',
    color: 'from-rose-500 to-red-600',
    unlockedAtScore: 120,
    conditionDescription: 'Earn 120 or more points',
  },
];

export function getPerformanceTitle(score: number): {
  title: string;
  subtitle: string;
  badgeEmoji: string;
  colorClass: string;
} {
  if (score >= 140) {
    return {
      title: 'Future Engineer Legend',
      subtitle: 'INCREDIBLE! You mastered almost every computer part like a true tech wizard! Byte is bowing down to your greatness! 🤖👑',
      badgeEmoji: '🏆',
      colorClass: 'text-amber-600',
    };
  }
  if (score >= 120) {
    return {
      title: 'Computer Champion',
      subtitle: 'OUTSTANDING! You have top-tier computer skills and solved tricky questions with ease! High five! ✋⚡',
      badgeEmoji: '🥇',
      colorClass: 'text-indigo-600',
    };
  }
  if (score >= 90) {
    return {
      title: 'Tech Superstar',
      subtitle: 'AWESOME JOB! You know your hardware inside and out. You are on track to build your own computer one day! 🚀💻',
      badgeEmoji: '🌟',
      colorClass: 'text-blue-600',
    };
  }
  if (score >= 50) {
    return {
      title: 'Computer Learner',
      subtitle: 'GREAT EFFORT! You learned so many new components today. Keep practicing and you will be a champion in no time! 📚✨',
      badgeEmoji: '💡',
      colorClass: 'text-emerald-600',
    };
  }
  return {
    title: 'Curious Explorer',
    subtitle: 'WONDERFUL START! Every great programmer and engineer started just like you. Byte is super proud of your curiosity! 🌈🔍',
    badgeEmoji: '🌱',
    colorClass: 'text-teal-600',
  };
}

/**
 * Shuffles an array with Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
