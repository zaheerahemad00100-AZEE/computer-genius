import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ComponentQuestion, MascotMood, AnswerRecord } from '../types/game';
import { ComponentIllustration } from './illustrations/ComponentIllustrations';
import { ByteMascot } from './mascot/ByteMascot';
import {
  ENGLISH_CORRECT_MESSAGES,
  ENGLISH_NEXT_TRANSITIONS,
  ENGLISH_INCORRECT_MESSAGES,
  ENGLISH_QUESTION_ANNOUNCEMENTS,
  getNonRepeatingDialogue,
} from '../data/questions';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Zap,
  Flame,
  Volume2,
  Loader2,
} from 'lucide-react';

interface QuizScreenProps {
  question: ComponentQuestion;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  showHints: boolean;
  voiceEnabled: boolean;
  onAnswerSubmit: (record: AnswerRecord) => void;
  onNextQuestion: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  questionIndex,
  totalQuestions,
  score,
  streak,
  showHints,
  voiceEnabled,
  onAnswerSubmit,
  onNextQuestion,
}) => {
  // Current question attempt state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isRetryPending, setIsRetryPending] = useState<boolean>(false);
  const [isAdvancing, setIsAdvancing] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [mascotMood, setMascotMood] = useState<MascotMood>('idle');
  const [pointsEarnedThisRound, setPointsEarnedThisRound] = useState<number>(0);

  // Track previous dialogues to prevent consecutive repetitions
  const lastPraiseRef = useRef<string>('');
  const lastTransitionRef = useRef<string>('');
  const lastRetryRef = useRef<string>('');
  const lastAnnouncementRef = useRef<string>('');
  const autoAdvanceTimerRef = useRef<number | null>(null);

  // Entrance announcement in friendly, natural English
  useEffect(() => {
    speechManager.cancel();
    setSelectedOption(null);
    setAttemptCount(0);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsRetryPending(false);
    setIsAdvancing(false);
    setMascotMood('idle');
    setPointsEarnedThisRound(0);

    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    // Pick a non-repeating English announcement
    const announcement = getNonRepeatingDialogue(
      ENGLISH_QUESTION_ANNOUNCEMENTS,
      lastAnnouncementRef.current
    );
    lastAnnouncementRef.current = announcement;
    setFeedbackMessage(announcement);

    // Speak announcement aloud in English
    speechManager.speak(announcement);

    return () => {
      speechManager.cancel();
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [question]);

  // Handle answer selection with natural English voice and automatic next-question progression
  const handleSelectOption = useCallback(
    (option: string) => {
      // Prevent clicks if already answered or advancing
      if (isAnswered || isAdvancing) return;

      soundManager.playPop();
      const isFirstAttempt = attemptCount === 0;
      const isAnswerRight = option === question.correctAnswer;

      if (isAnswerRight) {
        // === CORRECT ANSWER ===
        const points = isFirstAttempt ? 10 : 5;
        setIsAnswered(true);
        setIsCorrect(true);
        setIsRetryPending(false);
        setIsAdvancing(true);
        setSelectedOption(option);
        setPointsEarnedThisRound(points);

        // Sound effect and confetti
        soundManager.playCorrect();
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'],
          });
        } catch {}

        setMascotMood(streak + 1 >= 5 ? 'super_genius' : 'cheering');

        // Submit scoring record
        onAnswerSubmit({
          questionId: question.id,
          questionName: question.name,
          category: question.category,
          categoryLabel: question.categoryLabel,
          selectedAnswer: option,
          correctAnswer: question.correctAnswer,
          isCorrect: true,
          attemptsUsed: isFirstAttempt ? 1 : 2,
          pointsEarned: points,
          explanation: question.explanation,
        });

        // 1. Pick non-repeating English praise
        let praise = getNonRepeatingDialogue(
          ENGLISH_CORRECT_MESSAGES,
          lastPraiseRef.current
        );
        if (points === 5) {
          praise = "Great recovery! You got it right on your second try! Five points added! 🌟";
        }
        lastPraiseRef.current = praise;
        setFeedbackMessage(praise);

        const isLastQuestion = questionIndex + 1 >= totalQuestions;

        if (isLastQuestion) {
          // Final question conclusion
          const finalWrap = `${praise} Incredible performance! You answered all the questions! Let's reveal your final score!`;
          setFeedbackMessage(finalWrap);

          speechManager.speak(finalWrap, {
            onEnd: () => {
              autoAdvanceTimerRef.current = window.setTimeout(() => {
                onNextQuestion();
              }, 600);
            },
          });

          // Safety fallback timer if voice is muted or speech unsupported
          if (!voiceEnabled || !speechManager.isSupported()) {
            autoAdvanceTimerRef.current = window.setTimeout(() => {
              onNextQuestion();
            }, 2000);
          }
        } else {
          // 2. Pick non-repeating English transition line
          const transition = getNonRepeatingDialogue(
            ENGLISH_NEXT_TRANSITIONS,
            lastTransitionRef.current
          );
          lastTransitionRef.current = transition;

          // Speak sequence: Praise -> Transition -> Auto-Advance
          speechManager.speakSequence(
            [praise, transition],
            () => {
              // Wait 500ms after English speech finishes and automatically load next question!
              autoAdvanceTimerRef.current = window.setTimeout(() => {
                onNextQuestion();
              }, 500);
            },
            (stepIdx, text) => {
              setFeedbackMessage(text);
            }
          );

          // Safety timer if voice is muted or unavailable (advance after 2 seconds)
          if (!voiceEnabled || !speechManager.isSupported()) {
            autoAdvanceTimerRef.current = window.setTimeout(() => {
              onNextQuestion();
            }, 2000);
          }
        }
      } else {
        // === INCORRECT ANSWER ===
        if (isFirstAttempt) {
          // Allow 1 retry without advancing
          setAttemptCount(1);
          setSelectedOption(option);
          setIsRetryPending(true);
          soundManager.playGentleBoing();

          const retryMsg = getNonRepeatingDialogue(
            ENGLISH_INCORRECT_MESSAGES,
            lastRetryRef.current
          );
          lastRetryRef.current = retryMsg;
          setFeedbackMessage(retryMsg);
          setMascotMood('encouraging');

          // Speak encouraging retry line in English
          speechManager.speak(retryMsg);
        } else {
          // Second attempt also incorrect: reveal answer in English and automatically advance
          setIsAnswered(true);
          setIsCorrect(false);
          setIsRetryPending(false);
          setIsAdvancing(true);
          setSelectedOption(option);
          setPointsEarnedThisRound(0);
          soundManager.playGentleBoing();

          const revealMsg = `No worries! This component is the ${question.correctAnswer}. ${question.explanation}. Let's continue!`;
          setFeedbackMessage(revealMsg);
          setMascotMood('encouraging');

          onAnswerSubmit({
            questionId: question.id,
            questionName: question.name,
            category: question.category,
            categoryLabel: question.categoryLabel,
            selectedAnswer: option,
            correctAnswer: question.correctAnswer,
            isCorrect: false,
            attemptsUsed: 2,
            pointsEarned: 0,
            explanation: question.explanation,
          });

          // Speak revelation, then automatically move to next question
          speechManager.speak(revealMsg, {
            onEnd: () => {
              autoAdvanceTimerRef.current = window.setTimeout(() => {
                onNextQuestion();
              }, 800);
            },
          });

          if (!voiceEnabled || !speechManager.isSupported()) {
            autoAdvanceTimerRef.current = window.setTimeout(() => {
              onNextQuestion();
            }, 2500);
          }
        }
      }
    },
    [
      attemptCount,
      isAnswered,
      isAdvancing,
      question,
      questionIndex,
      totalQuestions,
      streak,
      voiceEnabled,
      onAnswerSubmit,
      onNextQuestion,
    ]
  );

  // Keyboard navigation support: keys 1-4, A-D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAnswered && !isAdvancing) {
        const key = e.key.toLowerCase();
        let idx = -1;
        if (key === '1' || key === 'a') idx = 0;
        if (key === '2' || key === 'b') idx = 1;
        if (key === '3' || key === 'c') idx = 2;
        if (key === '4' || key === 'd') idx = 3;

        if (idx >= 0 && idx < question.options.length) {
          e.preventDefault();
          handleSelectOption(question.options[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, isAdvancing, question.options, handleSelectOption]);

  const progressPercentage = Math.round(((questionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Progress & HUD Banner */}
      <div className="mb-6 bg-white rounded-2xl p-4 shadow-xs border border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-indigo-600">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {question.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {streak >= 3 && (
              <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {streak}x Streak!
              </span>
            )}
            <span className="text-sm font-black text-slate-800 tabular-nums">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Gameplay Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Host Mascot & Speech (4 cols on desktop) */}
        <div className="md:col-span-4 flex flex-col items-center text-center space-y-4 order-2 md:order-1">
          <ByteMascot
            mood={mascotMood}
            size="md"
            showSpeechBubble={false}
          />

          {/* Byte's Game Show Host Speech Card */}
          <div className="w-full bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-sm text-left relative overflow-hidden">
            {/* Host Badge Header */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-indigo-50">
              <div className="flex items-center gap-1.5 text-xs font-black text-indigo-700 uppercase tracking-wider">
                <span className="text-base">🎙️</span>
                <span>Host Byte:</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const text = feedbackMessage || question.title;
                  speechManager.speak(text);
                }}
                title="Replay host voice"
                className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Replay Voice</span>
              </button>
            </div>

            {/* Dynamic Spoken Dialogue */}
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-bold font-heading">
              "{feedbackMessage}"
            </p>

            {/* Clue Hint below if not answered */}
            {!isAnswered && showHints && (
              <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100 italic">
                💡 Clue: {question.riddle}
              </p>
            )}
          </div>

          {/* Fun Fact Card (Shows after answering) */}
          {isAnswered && (
            <div className="w-full bg-amber-50/90 rounded-2xl p-3.5 border border-amber-200 text-left animate-pop">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs font-black text-amber-800">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Did You Know?</span>
                </div>
                <button
                  type="button"
                  onClick={() => speechManager.speak(`Did you know? ${question.funFact}`)}
                  title="Read fun fact aloud"
                  className="p-1 rounded text-amber-700 hover:bg-amber-100 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {question.funFact}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Component Visual Stage & Options (8 cols on desktop) */}
        <div className="md:col-span-8 order-1 md:order-2 space-y-5">
          {/* Component Visual Stage Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 shadow-sm flex flex-col items-center justify-center relative overflow-hidden min-h-[260px] md:min-h-[300px]">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-radial from-indigo-50/50 to-transparent pointer-events-none" />

            {/* Question Heading with Read Aloud */}
            <div className="flex items-center justify-center gap-2 mb-4 relative z-10 flex-wrap">
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 text-center font-heading">
                {question.title}
              </h2>
              <button
                type="button"
                onClick={() => speechManager.speak(`${question.title}. ${question.riddle}`)}
                title="Read question and clue aloud"
                className="p-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                aria-label="Read question aloud"
              >
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Read Aloud</span>
              </button>
            </div>

            {/* Component Illustration */}
            <div className="relative z-10 transition-transform duration-300 hover:scale-105">
              <ComponentIllustration componentId={question.id} className="w-52 h-44 sm:w-64 sm:h-52 drop-shadow-md" />
            </div>
          </div>

          {/* Automatic Advancement Banner (Shown while host speaks & advancing) */}
          {isAdvancing && (
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-3 animate-pop">
              <div className="flex items-center gap-2.5">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-black font-heading tracking-wide">
                  {questionIndex + 1 >= totalQuestions
                    ? 'Calculating your final results... 🏆'
                    : 'Next question coming up in a moment... 🚀'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  speechManager.cancel();
                  onNextQuestion();
                }}
                className="text-xs font-black underline bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Next Now ⏩
              </button>
            </div>
          )}

          {/* Retry notice if 1st attempt was incorrect */}
          {isRetryPending && !isAdvancing && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-between gap-3 animate-wiggle">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-900 font-heading">
                    Try Again! (+5 Points possible)
                  </h4>
                  <p className="text-xs text-amber-800">
                    Not quite! Take a close look and select another option to score 5 points!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4 Answer Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];

              let btnStyle = 'bg-white hover:bg-indigo-50/60 border-slate-200 text-slate-800 hover:border-indigo-300';
              let letterStyle = 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700';

              if (isAnswered) {
                if (option === question.correctAnswer) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 scale-[1.02]';
                  letterStyle = 'bg-emerald-600 text-white';
                } else if (option === selectedOption && !isCorrect) {
                  btnStyle = 'bg-rose-100 text-rose-800 border-rose-300 opacity-80';
                  letterStyle = 'bg-rose-200 text-rose-800';
                } else {
                  btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-50';
                  letterStyle = 'bg-slate-100 text-slate-400';
                }
              } else if (isRetryPending && option === selectedOption) {
                btnStyle = 'bg-rose-50 text-rose-400 border-rose-200 line-through opacity-60 cursor-not-allowed';
                letterStyle = 'bg-rose-100 text-rose-400';
              }

              return (
                <button
                  key={option}
                  type="button"
                  disabled={isAnswered || isAdvancing || (isRetryPending && option === selectedOption)}
                  onClick={() => handleSelectOption(option)}
                  className={`group relative p-4 rounded-2xl border-2 font-bold text-left transition-all duration-200 flex items-center justify-between gap-3 shadow-xs active:scale-98 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${letterStyle}`}>
                      {letter}
                    </span>
                    <span className="text-base sm:text-lg font-heading leading-tight">
                      {option}
                    </span>
                  </div>

                  {/* Feedback icon on answered */}
                  {isAnswered && option === question.correctAnswer && (
                    <CheckCircle2 className="w-6 h-6 text-white shrink-0 animate-bounce" />
                  )}
                  {isAnswered && option === selectedOption && !isCorrect && (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
