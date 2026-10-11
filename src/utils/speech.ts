/**
 * Web Speech API manager for energetic, friendly English-only game show voice host.
 * Uses window.speechSynthesis and SpeechSynthesisUtterance.
 */

import { cleanSpeechText } from '../data/questions';

class SpeechManager {
  private isVoiceMuted: boolean = false;
  private cachedVoice: SpeechSynthesisVoice | null = null;
  private initialized: boolean = false;
  private currentTimeout: number | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
        };
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Filter strictly for English voices
    const englishVoices = voices.filter(
      (v) => v.lang === 'en-US' || v.lang.startsWith('en')
    );

    // Preferred natural, expressive English voices
    const preferredNames = [
      'Google US English',
      'Samantha',
      'Jenny',
      'Aria',
      'Natural',
      'Karen',
      'Victoria',
      'Zira',
      'Microsoft Zira',
      'Alex',
    ];

    let selectedVoice: SpeechSynthesisVoice | null = null;

    // Look for preferred names among English voices
    for (const name of preferredNames) {
      const match = englishVoices.find((v) => v.name.includes(name));
      if (match) {
        selectedVoice = match;
        break;
      }
    }

    // Fallback: any en-US voice, then any English voice
    if (!selectedVoice) {
      selectedVoice =
        englishVoices.find((v) => v.lang === 'en-US') ||
        englishVoices[0] ||
        voices[0] ||
        null;
    }

    this.cachedVoice = selectedVoice;
    this.initialized = true;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public getVoiceName(): string {
    if (!this.initialized || !this.cachedVoice) {
      this.initVoices();
    }
    return this.cachedVoice?.name || 'Standard English Voice';
  }

  public setMuted(muted: boolean) {
    this.isVoiceMuted = muted;
    if (muted && this.isSupported()) {
      this.cancel();
    }
  }

  public getMuted(): boolean {
    return this.isVoiceMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isVoiceMuted);
    return this.isVoiceMuted;
  }

  public cancel() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  public isSpeaking(): boolean {
    return this.isSupported() ? window.speechSynthesis.speaking : false;
  }

  /**
   * Speak a message out loud in natural English using the computer speakers.
   */
  public speak(
    message: string,
    options?: {
      rate?: number;
      pitch?: number;
      volume?: number;
      onEnd?: () => void;
    }
  ) {
    if (!this.isSupported() || this.isVoiceMuted) {
      options?.onEnd?.();
      return;
    }

    try {
      this.cancel();

      if (!this.initialized || !this.cachedVoice) {
        this.initVoices();
      }

      const textToSpeak = cleanSpeechText(message);
      if (!textToSpeak) {
        options?.onEnd?.();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      // Strictly set to en-US for natural English pronunciation
      utterance.lang = 'en-US';
      utterance.rate = options?.rate ?? 0.94; // Friendly, energetic, clear pace
      utterance.pitch = options?.pitch ?? 1.1; // Expressive host pitch
      utterance.volume = options?.volume ?? 1;

      if (this.cachedVoice) {
        utterance.voice = this.cachedVoice;
      }

      let hasFinished = false;
      const finishOnce = () => {
        if (!hasFinished) {
          hasFinished = true;
          if (this.currentTimeout) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
          }
          options?.onEnd?.();
        }
      };

      utterance.onend = finishOnce;
      utterance.onerror = finishOnce;

      // Safety fallback timer in case browser speech gets interrupted or onend fails
      const wordsCount = textToSpeak.split(' ').length;
      const estimatedDurationMs = Math.max(1600, wordsCount * 440);
      this.currentTimeout = window.setTimeout(finishOnce, estimatedDurationMs + 1200);

      window.speechSynthesis.speak(utterance);
    } catch {
      options?.onEnd?.();
    }
  }

  /**
   * Speak a sequence of messages in English (e.g. Congratulation praise THEN transition line)
   * with automatic onComplete callback after all have spoken.
   */
  public speakSequence(
    messages: string[],
    onSequenceComplete: () => void,
    onProgress?: (messageIndex: number, currentText: string) => void
  ) {
    if (!this.isSupported() || this.isVoiceMuted || messages.length === 0) {
      setTimeout(onSequenceComplete, 1200);
      return;
    }

    let currentIndex = 0;

    const speakNext = () => {
      if (currentIndex >= messages.length) {
        onSequenceComplete();
        return;
      }

      const currentMsg = messages[currentIndex];
      onProgress?.(currentIndex, currentMsg);
      currentIndex++;

      this.speak(currentMsg, {
        onEnd: () => {
          // Short 300ms pause between spoken sentences
          setTimeout(speakNext, 300);
        },
      });
    };

    speakNext();
  }

  /**
   * Test speech button for welcome screen or settings panel
   */
  public testVoice(sampleText?: string) {
    const text = sampleText || "Welcome, champions! I'm Host Byte, and I'm ready to play! Let's become a Computer Genius!";
    this.speak(text);
  }
}

export const speechManager = new SpeechManager();
