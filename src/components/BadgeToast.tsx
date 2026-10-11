import React, { useEffect } from 'react';
import { Award, Compass, Zap, Cpu, Trophy, Rocket, X } from 'lucide-react';
import { Badge } from '../types/game';

interface BadgeToastProps {
  badge: Badge | null;
  onDismiss: () => void;
}

export const BadgeToast: React.FC<BadgeToastProps> = ({ badge, onDismiss }) => {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onDismiss]);

  if (!badge) return null;

  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-white" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-white" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-white" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-white" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-white" />;
      default:
        return <Award className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-pop max-w-sm w-full select-none">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 p-4.5 flex items-start gap-3.5 relative overflow-hidden">
        {/* Confetti sparkle background accent */}
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-amber-100 rounded-full blur-xl opacity-60" />

        {/* Badge Icon */}
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${badge.color} flex items-center justify-center shrink-0 shadow-md animate-bounce`}>
          {renderBadgeIcon(badge.icon)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-600">
            <span>🎉 Badge Unlocked!</span>
          </div>
          <h4 className="text-base font-black text-slate-900 font-heading truncate">
            {badge.name}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
            {badge.description}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onDismiss}
          aria-label="Close notification"
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
