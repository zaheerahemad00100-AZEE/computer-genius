import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AnswerRecord, Badge } from '../types/game';
import { ByteMascot } from './mascot/ByteMascot';
import { getPerformanceTitle } from '../data/questions';
import { soundManager } from '../utils/audio';
import { RotateCcw, BookOpen, Home, Trophy, Target, Award, CheckCircle2, XCircle } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  maxScore: number;
  totalQuestions: number;
  answers: AnswerRecord[];
  badgesEarned: Badge[];
  onPlayAgain: () => void;
  onOpenReview: () => void;
  onBackToHome: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  maxScore,
  totalQuestions,
  answers,
  badgesEarned,
  onPlayAgain,
  onOpenReview,
  onBackToHome,
}) => {
  const perf = getPerformanceTitle(score);
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const incorrectCount = answers.filter((a) => !a.isCorrect).length;
  const accuracyPercentage = Math.round((correctCount / totalQuestions) * 100);

  // Play fanfare, shoot celebratory confetti, and speak victory praise
  useEffect(() => {
    soundManager.playVictoryFanfare();

    // Speak victory summary after initial fanfare
    const speechTimeout = setTimeout(() => {
      import('../utils/speech').then(({ speechManager }) => {
        speechManager.speak(`Incredible performance! You scored ${score} points out of ${maxScore} and earned the title of ${perf.title}! Give yourself a huge round of applause!`);
      });
    }, 1200);

    try {
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}

    return () => {
      clearTimeout(speechTimeout);
      import('../utils/speech').then(({ speechManager }) => {
        speechManager.cancel();
      });
    };
  }, [score, maxScore, perf.title]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-8 px-4 max-w-4xl mx-auto">
      <div className="w-full text-center">
        
        {/* Mascot celebrating */}
        <div className="mb-4">
          <ByteMascot
            mood="celebrating"
            speechText={`Hooray! You earned ${score} points! 🎉`}
            size="lg"
            showSpeechBubble={true}
          />
        </div>

        {/* Performance Title Badge */}
        <div className="space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-black text-sm uppercase tracking-wider animate-bounce">
            <span>{perf.badgeEmoji}</span>
            <span>Performance Rank</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-heading">
            {perf.title}
          </h1>

          <p className="text-base sm:text-lg font-bold text-slate-600 max-w-xl mx-auto leading-relaxed">
            {perf.subtitle}
          </p>
        </div>

        {/* Score & Metrics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl mx-auto mb-8">
          {/* Card 1: Score */}
          <div className="bg-white p-4 rounded-2xl border-2 border-blue-100 shadow-xs flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Score
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 font-heading tabular-nums mt-1">
              {score} <span className="text-sm font-semibold text-slate-400">/ {maxScore}</span>
            </div>
          </div>

          {/* Card 2: Accuracy */}
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-100 shadow-xs flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Accuracy
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading tabular-nums mt-1">
              {accuracyPercentage}%
            </div>
          </div>

          {/* Card 3: Correct Answers */}
          <div className="bg-white p-4 rounded-2xl border-2 border-teal-100 shadow-xs flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Correct
            </span>
            <div className="text-2xl sm:text-3xl font-black text-teal-600 font-heading tabular-nums mt-1">
              {correctCount}
            </div>
          </div>

          {/* Card 4: Retries / Needs Work */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-100 shadow-xs flex flex-col items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Need Practice
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 font-heading tabular-nums mt-1">
              {incorrectCount}
            </div>
          </div>
        </div>

        {/* Badges Earned Section */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 shadow-xs max-w-2xl mx-auto mb-6 text-left">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
                Badges Earned This Run ({badgesEarned.length}/5)
              </h3>
            </div>
            <span className="text-xs font-bold text-indigo-600">
              {badgesEarned.length === 5 ? 'All Badges Unlocked! 🌟' : 'Keep playing to collect all!'}
            </span>
          </div>

          {badgesEarned.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badgesEarned.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs`}>
                    ⭐
                  </div>
                  <div className="min-w-0">
                    <span className="block font-black text-xs sm:text-sm text-slate-900 truncate">
                      {badge.name}
                    </span>
                    <span className="block text-[11px] text-slate-500 line-clamp-1">
                      {badge.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Play again and answer questions on your first attempt to unlock badges!
            </p>
          )}
        </div>

        {/* Topic-Wise Performance Statistics */}
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 shadow-xs max-w-2xl mx-auto mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
              Topic-Wise Hardware Mastery
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { key: 'input', label: 'Input Devices (Keyboard, Mouse, etc.)' },
              { key: 'output', label: 'Output Devices (Monitor, Printer, Speakers, etc.)' },
              { key: 'processing', label: 'Processing & Memory (CPU, RAM, Motherboard)' },
              { key: 'storage', label: 'Storage Drives (Flash Drive, Hard Disk / SSD)' },
              { key: 'power', label: 'Power & Protection (UPS Backup)' },
            ].map(({ key, label }) => {
              const categoryAnswers = answers.filter((a) => a.category === key);
              if (categoryAnswers.length === 0) return null;
              const correct = categoryAnswers.filter((a) => a.isCorrect).length;
              const total = categoryAnswers.length;
              const pct = Math.round((correct / total) * 100);

              return (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>{label}</span>
                    <span className="tabular-nums font-black text-indigo-600">
                      {correct}/{total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct === 100
                          ? 'bg-emerald-500'
                          : pct >= 50
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Play Again, Review, Home */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
          {/* PLAY AGAIN */}
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-base rounded-2xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN</span>
          </button>

          {/* REVIEW ANSWERS */}
          <button
            onClick={onOpenReview}
            className="w-full sm:w-auto py-4 px-5 bg-white hover:bg-slate-50 text-indigo-700 border-2 border-indigo-200 hover:border-indigo-300 font-bold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>REVIEW ANSWERS</span>
          </button>

          {/* BACK TO HOME */}
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto py-4 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-slate-600" />
            <span>HOME</span>
          </button>
        </div>

      </div>
    </div>
  );
};
