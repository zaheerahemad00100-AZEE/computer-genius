import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameView, GameSettings, ComponentQuestion, AnswerRecord, Badge } from './types/game';
import { COMPONENT_QUESTIONS, BADGES, shuffleArray } from './data/questions';
import { soundManager } from './utils/audio';
import { speechManager } from './utils/speech';
import {
  loadGameStorage,
  saveGameStorage,
  resetGameStorage,
  TechVerseStorageData,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { HowToPlayModal } from './components/HowToPlayModal';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { ReviewModal } from './components/ReviewModal';
import { BadgeToast } from './components/BadgeToast';

export default function App() {
  // Safe storage state
  const [storageData, setStorageData] = useState<TechVerseStorageData>(() => loadGameStorage());

  // Game view navigation state
  const [gameView, setGameView] = useState<GameView>('WELCOME');

  // Teacher / Classroom settings initialized from storage
  const [settings, setSettings] = useState<GameSettings>(() => storageData.settings);

  // Modals state
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isTeacherSettingsOpen, setIsTeacherSettingsOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeBadgeToast, setActiveBadgeToast] = useState<Badge | null>(null);

  // Active game session state
  const [activeQuestions, setActiveQuestions] = useState<ComponentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const maxSessionStreakRef = useRef(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [badgesEarned, setBadgesEarned] = useState<Badge[]>([]);

  // Sync audio & speech muted states on initial mount
  useEffect(() => {
    soundManager.setMuted(!settings.soundEnabled);
    speechManager.setMuted(!settings.voiceEnabled);
  }, [settings.soundEnabled, settings.voiceEnabled]);

  // Sound FX toggle handler
  const handleToggleSound = () => {
    const isMutedNow = soundManager.toggleMute();
    const nextEnabled = !isMutedNow;
    setSettings((prev) => {
      const updated = { ...prev, soundEnabled: nextEnabled };
      saveGameStorage({ settings: updated });
      return updated;
    });
  };

  // Voice narration toggle handler
  const handleToggleVoice = () => {
    const isVoiceMutedNow = speechManager.toggleMute();
    const nextEnabled = !isVoiceMutedNow;
    setSettings((prev) => {
      const updated = { ...prev, voiceEnabled: nextEnabled };
      saveGameStorage({ settings: updated });
      return updated;
    });
  };

  // Start new game session
  const handleStartGame = useCallback((countOverride?: 5 | 10 | 15) => {
    soundManager.playPop();
    speechManager.cancel();
    const count = countOverride || settings.questionCount;

    // Pick and shuffle questions
    const shuffledPool = shuffleArray(COMPONENT_QUESTIONS);
    const selected = shuffledPool.slice(0, count).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));

    setActiveQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    maxSessionStreakRef.current = 0;
    setAnswers([]);
    setBadgesEarned([]);
    setActiveBadgeToast(null);
    setGameView('PLAYING');
  }, [settings.questionCount]);

  // Check and unlock badges
  const checkBadgeUnlocks = useCallback((
    currentScore: number,
    currentStreak: number,
    record: AnswerRecord,
    currentBadges: Badge[]
  ) => {
    const newlyUnlocked: Badge[] = [];

    BADGES.forEach((badge) => {
      // Skip if already earned in this session
      if (currentBadges.some((b) => b.id === badge.id)) return;

      let shouldUnlock = false;

      if (badge.id === 'beginner_explorer' && record.isCorrect) {
        shouldUnlock = true;
      } else if (badge.id === 'keyboard_ninja' && currentStreak >= 3) {
        shouldUnlock = true;
      } else if (
        badge.id === 'hardware_hero' &&
        record.isCorrect &&
        ['cpu', 'ram', 'motherboard'].includes(record.questionId)
      ) {
        shouldUnlock = true;
      } else if (badge.id === 'computer_champion' && currentScore >= 80) {
        shouldUnlock = true;
      } else if (badge.id === 'future_engineer' && currentScore >= 120) {
        shouldUnlock = true;
      }

      if (shouldUnlock) {
        newlyUnlocked.push(badge);
      }
    });

    if (newlyUnlocked.length > 0) {
      const firstNew = newlyUnlocked[0];
      setBadgesEarned((prev) => [...prev, ...newlyUnlocked]);
      setActiveBadgeToast(firstNew);
      soundManager.playBadgeUnlocked();

      // Persist newly unlocked badge IDs to storage
      const currentStored = loadGameStorage();
      const updatedBadgeIds = Array.from(
        new Set([...currentStored.unlockedBadgeIds, ...newlyUnlocked.map((b) => b.id)])
      );
      saveGameStorage({ unlockedBadgeIds: updatedBadgeIds });
      setStorageData((prev) => ({ ...prev, unlockedBadgeIds: updatedBadgeIds }));
    }
  }, []);

  // Answer submitted by student
  const handleAnswerSubmit = useCallback((record: AnswerRecord) => {
    const updatedScore = score + record.pointsEarned;
    const updatedStreak = record.isCorrect ? streak + 1 : 0;
    if (updatedStreak > maxSessionStreakRef.current) {
      maxSessionStreakRef.current = updatedStreak;
    }

    setScore(updatedScore);
    setStreak(updatedStreak);
    setAnswers((prev) => [...prev, record]);

    // Check for 3-in-a-row sound bonus
    if (record.isCorrect && updatedStreak === 3) {
      soundManager.playStreakBonus();
    }

    // Check badges
    checkBadgeUnlocks(updatedScore, updatedStreak, record, badgesEarned);
  }, [score, streak, badgesEarned, checkBadgeUnlocks]);

  // Proceed to next question or results
  const handleNextQuestion = useCallback(() => {
    soundManager.playPop();
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Save game completion stats into persistent storage
      const currentStored = loadGameStorage();
      const newHighScore = Math.max(currentStored.highScore, score);
      const newBestStreak = Math.max(
        currentStored.bestStreak,
        maxSessionStreakRef.current,
        streak
      );

      const updatedMastery = { ...currentStored.categoryMastery };
      answers.forEach((ans) => {
        if (updatedMastery[ans.category]) {
          updatedMastery[ans.category] = {
            attempted: updatedMastery[ans.category].attempted + 1,
            correct: updatedMastery[ans.category].correct + (ans.isCorrect ? 1 : 0),
          };
        }
      });

      const totalAns = currentStored.totalQuestionsAnswered + answers.length;
      const totalCorr = currentStored.totalCorrectAnswers + answers.filter((a) => a.isCorrect).length;
      const accuracy = totalAns > 0 ? totalCorr / totalAns : 0;
      const adaptiveLevel = accuracy >= 0.8 ? 'master' : accuracy >= 0.5 ? 'explorer' : 'beginner';

      const allBadgeIds = Array.from(
        new Set([...currentStored.unlockedBadgeIds, ...badgesEarned.map((b) => b.id)])
      );

      saveGameStorage({
        highScore: newHighScore,
        bestStreak: newBestStreak,
        totalGamesPlayed: currentStored.totalGamesPlayed + 1,
        totalQuestionsAnswered: totalAns,
        totalCorrectAnswers: totalCorr,
        categoryMastery: updatedMastery,
        adaptiveLevel,
        unlockedBadgeIds: allBadgeIds,
      });

      setStorageData(loadGameStorage());
      setGameView('RESULTS');
    }
  }, [currentQuestionIndex, activeQuestions.length, score, streak, answers, badgesEarned]);

  // Reset & return to welcome
  const handleBackToHome = () => {
    soundManager.playPop();
    speechManager.cancel();
    setGameView('WELCOME');
    setCurrentQuestionIndex(0);
    setScore(0);
    setStreak(0);
    maxSessionStreakRef.current = 0;
    setAnswers([]);
    setBadgesEarned([]);
    setStorageData(loadGameStorage());
  };

  // Reset all student data on device (Teacher feature)
  const handleResetAllData = () => {
    resetGameStorage();
    const fresh = loadGameStorage();
    setStorageData(fresh);
    setSettings(fresh.settings);
    soundManager.setMuted(!fresh.settings.soundEnabled);
    speechManager.setMuted(!fresh.settings.voiceEnabled);
    handleBackToHome();
  };

  const maxPossibleScore = activeQuestions.length * 10;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Bar / Header */}
      <Navbar
        soundEnabled={settings.soundEnabled}
        voiceEnabled={settings.voiceEnabled}
        onToggleSound={handleToggleSound}
        onToggleVoice={handleToggleVoice}
        onOpenTeacherSettings={() => setIsTeacherSettingsOpen(true)}
        score={score}
        streak={streak}
        showInGameStats={gameView === 'PLAYING'}
      />

      {/* Main Content View Container */}
      <main className="flex-1 flex flex-col">
        {gameView === 'WELCOME' && (
          <WelcomeScreen
            onStartGame={() => handleStartGame()}
            onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
            questionCount={settings.questionCount}
            onSelectQuestionCount={(count) => {
              setSettings((prev) => {
                const updated = { ...prev, questionCount: count };
                saveGameStorage({ settings: updated });
                return updated;
              });
            }}
            voiceEnabled={settings.voiceEnabled}
            onTestVoice={() => speechManager.testVoice()}
            highScore={storageData.highScore}
            bestStreak={storageData.bestStreak}
            totalGamesPlayed={storageData.totalGamesPlayed}
            unlockedBadgeIds={storageData.unlockedBadgeIds}
          />
        )}

        {gameView === 'PLAYING' && activeQuestions.length > 0 && (
          <QuizScreen
            question={activeQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            totalQuestions={activeQuestions.length}
            score={score}
            streak={streak}
            showHints={settings.showHints}
            voiceEnabled={settings.voiceEnabled}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {gameView === 'RESULTS' && (
          <ResultsScreen
            score={score}
            maxScore={maxPossibleScore}
            totalQuestions={activeQuestions.length}
            answers={answers}
            badgesEarned={badgesEarned}
            onPlayAgain={() => handleStartGame()}
            onOpenReview={() => setIsReviewModalOpen(true)}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>

      {/* Modals and Toasts */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />

      <TeacherSettingsModal
        isOpen={isTeacherSettingsOpen}
        onClose={() => setIsTeacherSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => {
          setSettings((prev) => {
            const updated = { ...prev, ...newVals };
            saveGameStorage({ settings: updated });
            return updated;
          });
          if (typeof newVals.soundEnabled === 'boolean') {
            soundManager.setMuted(!newVals.soundEnabled);
          }
          if (typeof newVals.voiceEnabled === 'boolean') {
            speechManager.setMuted(!newVals.voiceEnabled);
          }
        }}
        onRestartGame={() => {
          handleBackToHome();
        }}
        onResetAllData={handleResetAllData}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        answers={answers}
      />

      <BadgeToast
        badge={activeBadgeToast}
        onDismiss={() => setActiveBadgeToast(null)}
      />
    </div>
  );
}
