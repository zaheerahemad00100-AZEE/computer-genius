import React from 'react';
import { X, Trophy, CheckCircle, RefreshCw, Zap, Award, BookOpen } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-to-play-title"
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-indigo-100 p-6 md:p-8"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl">
              🎮
            </div>
            <div>
              <h2 id="how-to-play-title" className="text-xl font-black text-slate-900 font-heading">
                How to Play
              </h2>
              <p className="text-xs text-slate-500 font-medium">Quick guide for Class 5 champions!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close rules dialog"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-5 text-sm">
          {/* Rule 1: Guess the Component */}
          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-base">1. Look at the Picture</h3>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Check the colorful computer part in the center and read Byte's riddle clue. Tap the correct button out of the 4 choices!
              </p>
            </div>
          </div>

          {/* Rule 2: Scoring & Automatic Progression */}
          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 text-base">2. Points & Automatic Next Question</h3>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Get it right for <strong className="text-emerald-700 font-bold">+10 points</strong> (or <strong className="text-emerald-700 font-bold">+5 points</strong> on retry). Host Byte celebrates out loud and <strong className="text-emerald-700 font-bold">automatically advances</strong> to the next question!
              </p>
            </div>
          </div>

          {/* Rule 3: Streaks & Combos */}
          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-base">3. Streaks & Super Genius Mode</h3>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Answer 3 in a row to ignite a fire streak bonus! Reach 5 in a row to unlock Byte's golden <strong className="text-amber-700 font-bold">Super Genius Mode</strong>!
              </p>
            </div>
          </div>

          {/* Rule 4: Badges */}
          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-purple-900 text-base">4. Collect All 5 Badges</h3>
              <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                Earn special badges like <span className="font-bold text-purple-800">Keyboard Ninja</span> and <span className="font-bold text-purple-800">Hardware Hero</span> as you learn all 15 components!
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-2xl font-bold font-heading text-base shadow-md hover:shadow-lg transition-all"
          >
            I'm Ready to Play! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
