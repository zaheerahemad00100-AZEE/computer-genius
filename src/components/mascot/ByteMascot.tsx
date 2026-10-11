import React from 'react';
import { MascotMood } from '../../types/game';

interface ByteMascotProps {
  mood?: MascotMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
}

export const ByteMascot: React.FC<ByteMascotProps> = ({
  mood = 'idle',
  speechText,
  size = 'md',
  showSpeechBubble = true,
}) => {
  const sizeMap = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-52 h-52',
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Speech bubble */}
      {showSpeechBubble && speechText && (
        <div className="relative mb-3 max-w-xs md:max-w-md animate-pop">
          <div className="bg-white px-4 py-2.5 rounded-2xl shadow-lg border-2 border-indigo-200 text-center font-bold text-slate-800 text-sm md:text-base">
            {speechText}
          </div>
          {/* Bubble tail */}
          <div className="w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-indigo-200 mx-auto" />
        </div>
      )}

      {/* Robot SVG mascot */}
      <div className={`${sizeMap[size]} relative transition-transform duration-300 ${
        mood === 'cheering' || mood === 'celebrating' ? 'animate-bounce' : 
        mood === 'super_genius' ? 'animate-pulse-subtle' : 'animate-float'
      }`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Party Hat for celebrating */}
          {mood === 'celebrating' && (
            <g className="animate-wiggle origin-bottom">
              <polygon points="100,5 82,45 118,45" fill="#F59E0B" />
              <polygon points="100,5 91,45 109,45" fill="#EF4444" />
              <circle cx="100" cy="5" r="7" fill="#10B981" />
            </g>
          )}

          {/* Antenna */}
          <path d="M100 48 V22" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
          <circle
            cx="100"
            cy="20"
            r="10"
            fill={mood === 'super_genius' ? '#F59E0B' : mood === 'cheering' ? '#10B981' : '#3B82F6'}
            className="animate-pulse"
          />
          <circle cx="100" cy="20" r="5" fill="#FFFFFF" />

          {/* Ears / Side Bolts */}
          <rect x="36" y="70" width="10" height="26" rx="4" fill="#64748B" />
          <rect x="154" y="70" width="10" height="26" rx="4" fill="#64748B" />
          <circle cx="41" cy="83" r="3" fill="#94A3B8" />
          <circle cx="159" cy="83" r="3" fill="#94A3B8" />

          {/* Head (Computer Monitor Case) */}
          <rect
            x="44"
            y="44"
            width="112"
            height="86"
            rx="24"
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="5"
          />
          {/* Head highlight */}
          <path
            d="M58 54 Q100 48 142 54"
            stroke="#93C5FD"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Screen Glass */}
          <rect
            x="56"
            y="56"
            width="88"
            height="62"
            rx="16"
            fill="#0F172A"
          />

          {/* Screen Content / Eyes & Mouth */}
          {mood === 'super_genius' ? (
            /* Cool Sunglasses for Super Genius! */
            <g>
              <polygon points="64,68 96,68 92,86 68,86" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
              <polygon points="104,68 136,68 132,86 108,86" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
              <line x1="96" y1="74" x2="104" y2="74" stroke="#F59E0B" strokeWidth="3" />
              {/* Glare */}
              <line x1="68" y1="72" x2="80" y2="82" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
              <line x1="108" y1="72" x2="120" y2="82" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
              {/* Confident Grin */}
              <path d="M84 98 Q100 110 116 98" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          ) : mood === 'cheering' || mood === 'celebrating' ? (
            /* Happy Happy Arc Eyes ( ^ _ ^ ) */
            <g>
              <path d="M70 78 Q80 66 90 78" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M110 78 Q120 66 130 78" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Rosy cheeks */}
              <circle cx="68" cy="92" r="5" fill="#F43F5E" opacity="0.8" />
              <circle cx="132" cy="92" r="5" fill="#F43F5E" opacity="0.8" />
              {/* Big happy open mouth */}
              <path d="M88 90 Q100 106 112 90 Z" fill="#38BDF8" />
            </g>
          ) : mood === 'encouraging' ? (
            /* Friendly Wink & Warm Smile */
            <g>
              {/* Left eye open */}
              <ellipse cx="80" cy="78" rx="8" ry="10" fill="#38BDF8" />
              <circle cx="82" cy="75" r="3" fill="#FFFFFF" />
              {/* Right eye winking */}
              <path d="M112 78 Q120 70 128 78" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Rosy cheeks */}
              <circle cx="68" cy="92" r="4" fill="#FB7185" opacity="0.6" />
              <circle cx="132" cy="92" r="4" fill="#FB7185" opacity="0.6" />
              {/* Gentle smile */}
              <path d="M88 94 Q100 104 112 94" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          ) : mood === 'thinking' ? (
            /* Curious / Thinking Eyes looking up-right */
            <g>
              <ellipse cx="82" cy="74" rx="8" ry="9" fill="#38BDF8" />
              <circle cx="85" cy="71" r="3" fill="#FFFFFF" />
              <ellipse cx="122" cy="74" rx="8" ry="9" fill="#38BDF8" />
              <circle cx="125" cy="71" r="3" fill="#FFFFFF" />
              {/* Cute curious small 'o' mouth */}
              <circle cx="100" cy="96" r="5" fill="#38BDF8" />
            </g>
          ) : (
            /* Default Idle Cute Eyes */
            <g>
              <ellipse cx="78" cy="78" rx="8" ry="11" fill="#38BDF8" />
              <circle cx="80" cy="74" r="3.5" fill="#FFFFFF" />
              <circle cx="76" cy="83" r="1.5" fill="#FFFFFF" />

              <ellipse cx="122" cy="78" rx="8" ry="11" fill="#38BDF8" />
              <circle cx="124" cy="74" r="3.5" fill="#FFFFFF" />
              <circle cx="120" cy="83" r="1.5" fill="#FFFFFF" />

              {/* Gentle cute smile */}
              <path d="M90 95 Q100 102 110 95" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* Neck */}
          <rect x="92" y="130" width="16" height="12" rx="3" fill="#64748B" />

          {/* Body */}
          <rect
            x="64"
            y="142"
            width="72"
            height="46"
            rx="14"
            fill="#2563EB"
            stroke="#1D4ED8"
            strokeWidth="4"
          />
          {/* Belly screen with heart / meter */}
          <rect x="76" y="150" width="48" height="26" rx="8" fill="#1E293B" />
          {/* Heart icon or pulse */}
          <path
            d="M93 160 C90 156 84 158 84 163 C84 168 93 173 100 175 C107 173 116 168 116 163 C116 158 110 156 107 160 C104 156 96 156 93 160 Z"
            fill="#EF4444"
          />

          {/* Left Arm */}
          {mood === 'cheering' || mood === 'celebrating' ? (
            /* Hands in the air! */
            <path
              d="M64 150 Q40 120 34 100"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M64 150 Q44 160 48 180"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Right Arm */}
          {mood === 'cheering' || mood === 'celebrating' ? (
            /* Hands in the air! */
            <path
              d="M136 150 Q160 120 166 100"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'encouraging' ? (
            /* Thumbs up wave */
            <path
              d="M136 150 Q164 140 168 120"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            /* Friendly waving hand */
            <path
              d="M136 150 Q160 146 164 130"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Small feet */}
          <rect x="76" y="188" width="18" height="8" rx="4" fill="#1E293B" />
          <rect x="106" y="188" width="18" height="8" rx="4" fill="#1E293B" />
        </svg>
      </div>
    </div>
  );
};
