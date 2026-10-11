import React from 'react';
import { X, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { AnswerRecord } from '../types/game';
import { ComponentIllustration } from './illustrations/ComponentIllustrations';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  answers: AnswerRecord[];
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, answers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-answers-title"
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-4 border-indigo-100 p-6 md:p-8"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
              📝
            </div>
            <div>
              <h2 id="review-answers-title" className="text-xl font-black text-slate-900 font-heading">
                Answer Review
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Check your answers and learn the secrets of each component!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close review dialog"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-5">
          {answers.map((ans, idx) => {
            const isFullScore = ans.isCorrect && ans.attemptsUsed === 1;
            const isHalfScore = ans.isCorrect && ans.attemptsUsed === 2;

            return (
              <div
                key={ans.questionId}
                className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-colors ${
                  isFullScore
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : isHalfScore
                    ? 'bg-amber-50/60 border-amber-200'
                    : 'bg-rose-50/60 border-rose-200'
                }`}
              >
                {/* Component Mini Illustration */}
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200/80 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                  <ComponentIllustration componentId={ans.questionId} className="w-14 h-14" />
                </div>

                {/* Question Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                      #{idx + 1}
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-heading">
                      {ans.questionName}
                    </h4>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500 font-medium">Your Answer:</span>
                      <span className={`font-bold ${ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {ans.selectedAnswer}
                      </span>
                    </div>

                    {!ans.isCorrect && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-500 font-medium">Correct:</span>
                        <span className="font-bold text-emerald-800">
                          {ans.correctAnswer}
                        </span>
                      </div>
                    )}

                    <p className="text-slate-600 italic text-[11px] pt-1">
                      💡 {ans.explanation}
                    </p>
                  </div>
                </div>

                {/* Score badge */}
                <div className="shrink-0 text-right sm:text-center self-end sm:self-center">
                  <div className={`px-3 py-1.5 rounded-xl font-black text-xs inline-flex items-center gap-1 ${
                    isFullScore
                      ? 'bg-emerald-600 text-white'
                      : isHalfScore
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-500 text-white'
                  }`}>
                    {isFullScore && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isHalfScore && <RotateCcw className="w-3.5 h-3.5" />}
                    {!ans.isCorrect && <XCircle className="w-3.5 h-3.5" />}
                    <span>+{ans.pointsEarned} pts</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-1">
                    {ans.attemptsUsed === 1 ? '1st try' : '2nd attempt'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold font-heading text-sm transition-colors"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};
