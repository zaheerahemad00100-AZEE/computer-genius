import React from 'react';
import { Play, HelpCircle, Award, Sparkles, Monitor, Cpu, Keyboard, Zap } from 'lucide-react';
import { ByteMascot } from './mascot/ByteMascot';
import { BADGES } from '../data/questions';

interface WelcomeScreenProps {
  onStartGame: () => void;
  onOpenHowToPlay: () => void;
  questionCount: number;
  onSelectQuestionCount: (count: 5 | 10 | 15) => void;
  voiceEnabled: boolean;
  onTestVoice: () => void;
  highScore?: number;
  bestStreak?: number;
  totalGamesPlayed?: number;
  unlockedBadgeIds?: string[];
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartGame,
  onOpenHowToPlay,
  questionCount,
  onSelectQuestionCount,
  voiceEnabled,
  onTestVoice,
  highScore = 0,
  bestStreak = 0,
  totalGamesPlayed = 0,
  unlockedBadgeIds = [],
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-8 px-4 max-w-4xl mx-auto">
      {/* Playful Floating Tech Badges Background Icons */}
      <div className="w-full text-center relative z-10">
        
        {/* Mascot Section */}
        <div className="mb-4">
          <ByteMascot
            mood="idle"
            speechText="Welcome, Champions! 🎙️ I am Host Byte! Are you ready to become a Computer Genius?"
            size="lg"
            showSpeechBubble={true}
          />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-wider">
            <span>✨ TechVerse: The Talking Computer Adventure</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 font-heading leading-tight">
            Computer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Genius</span> Challenge
          </h1>
          <p className="text-lg sm:text-2xl font-bold text-slate-600 max-w-xl mx-auto">
            Can You Become a Computer Master?
          </p>
          <p className="text-sm text-indigo-700 font-bold bg-indigo-50/80 inline-block px-4 py-1.5 rounded-full border border-indigo-200">
            🎙️ Interactive Spoken Host · Automatic Progression · Class 5 Edition
          </p>

          {totalGamesPlayed > 0 && (
            <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
              <span className="text-xs font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                🏆 High Score: {highScore} pts
              </span>
              <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                🔥 Best Streak: {bestStreak}x
              </span>
              <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full border border-purple-300">
                🎖️ Badges: {unlockedBadgeIds.length} / {BADGES.length}
              </span>
            </div>
          )}
        </div>

        {/* Question Count Selection Strip & Voice Test Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {/* Question Count Selection Strip */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white p-2 rounded-2xl border-2 border-indigo-100 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
              Quiz Length:
            </span>
            <div className="flex gap-1.5">
              {([5, 10, 15] as const).map((count) => (
                <button
                  key={count}
                  onClick={() => onSelectQuestionCount(count)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    questionCount === count
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {count} Qs
                </button>
              ))}
            </div>
          </div>

          {/* Test Voice Button */}
          <button
            onClick={onTestVoice}
            className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-3 rounded-2xl border-2 border-indigo-200 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer active:scale-95"
            title="Click to test text-to-speech through your computer speakers"
          >
            <span className="text-base">🔊</span>
            <span>Test Byte's Voice</span>
          </button>
        </div>

        {/* Large Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          {/* Large START GAME Button */}
          <button
            onClick={onStartGame}
            className="w-full sm:w-auto flex-1 py-4 px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xl rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>START GAME</span>
          </button>

          {/* How to Play Button */}
          <button
            onClick={onOpenHowToPlay}
            className="w-full sm:w-auto py-4 px-6 bg-white hover:bg-slate-50 text-indigo-700 border-2 border-indigo-200 hover:border-indigo-300 font-bold text-base rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span>How to Play</span>
          </button>
        </div>

        {/* Badges Preview Section */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-6 border border-slate-200/80 shadow-xs max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700">
              5 Mystery Badges to Earn
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                      : 'bg-slate-50 border-slate-200/60 hover:bg-indigo-50/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center text-lg mb-2 shadow-xs`}>
                    {isUnlocked ? '🌟' : '🔒'}
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    {badge.name}
                  </span>
                  <span className={`text-[10px] mt-1 font-semibold ${isUnlocked ? 'text-amber-700' : 'text-slate-500'}`}>
                    {isUnlocked ? '✓ Unlocked' : badge.conditionDescription}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
