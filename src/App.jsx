import { useState, useEffect, useCallback } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import BaseTransition from './components/BaseTransition';
import MilestoneOverlay from './components/MilestoneOverlay';
import FinalScreen from './components/FinalScreen';
import MistakesScreen from './components/MistakesScreen';
import quizData from '../op_exact_100_quiz.json';
import { startBGM, resumeBGMOnNext, pauseBGMOnWrong, stopBGM } from './utils/audio';
import './index.css';

const STORAGE_KEY = 'op-quiz-state';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* ignore */ }
}

function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) { /* ignore */ }
}

const questions = quizData.questions;

function getInitialGameState() {
  return {
    currentQuestion: 0,
    erkaScore: { correct: 0, wrong: 0 },
    buddyScore: { correct: 0, wrong: 0 },
    answers: [],
    mistakes: [],
    seenBases: ['1.1'],
  };
}

export default function App() {
  const [screen, setScreen] = useState('intro'); // intro, quiz, base-transition, final, mistakes
  const [gameState, setGameState] = useState(getInitialGameState);
  const [hasSave, setHasSave] = useState(false);
  const [baseTransitionData, setBaseTransitionData] = useState(null);
  const [milestoneData, setMilestoneData] = useState(null);
  const [pendingQuestion, setPendingQuestion] = useState(null);

  // Check for saved state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.currentQuestion > 0 && saved.currentQuestion < 100) {
      setHasSave(true);
    }
  }, []);

  // Save state on changes during quiz
  useEffect(() => {
    if (screen === 'quiz' || screen === 'final') {
      saveState(gameState);
    }
  }, [gameState, screen]);

  // Handle BGM playback according to screen
  useEffect(() => {
    if (screen === 'final' || screen === 'intro' || screen === 'mistakes') {
      stopBGM();
    }
  }, [screen]);

  const handleStart = useCallback(() => {
    const freshState = getInitialGameState();
    setGameState(freshState);
    clearState();
    startBGM(0);
    // Show base transition for first base once
    const firstQ = questions[0];
    setBaseTransitionData({
      baseCode: firstQ.baseCode,
      base: firstQ.base,
    });
    setScreen('base-transition');
    setPendingQuestion(0);
  }, []);

  const handleContinue = useCallback(() => {
    const saved = loadState();
    if (saved) {
      setGameState({
        ...saved,
        seenBases: saved.seenBases || ['1.1'],
      });
      startBGM(saved.currentQuestion);
      setScreen('quiz');
    }
  }, []);

  const handleBaseTransitionDone = useCallback(() => {
    setBaseTransitionData(null);
    if (pendingQuestion !== null) {
      setGameState(prev => ({ ...prev, currentQuestion: pendingQuestion }));
      setPendingQuestion(null);
    }
    setScreen('quiz');
  }, [pendingQuestion]);

  const handleMilestoneDone = useCallback(() => {
    setMilestoneData(null);
  }, []);

  const handleAnswer = useCallback((questionIndex, isCorrect, chosenIndex, chosenText) => {
    const q = questions[questionIndex];
    const author = q.author; // erka or buddy
    
    setGameState(prev => {
      const newState = { ...prev };
      const scoreKey = author === 'erka' ? 'erkaScore' : 'buddyScore';
      newState[scoreKey] = { ...prev[scoreKey] };
      
      if (isCorrect) {
        newState[scoreKey].correct = prev[scoreKey].correct + 1;
      } else {
        newState[scoreKey].wrong = prev[scoreKey].wrong + 1;
        newState.mistakes = [...prev.mistakes, {
          questionIndex,
          question: q.question,
          type: q.type,
          author: q.author,
          authorName: q.author === 'erka' ? 'Кадырбекова Еркеназ' : 'Торгаутова Алсу',
          chosenIndex,
          chosenText: chosenText || null,
          correctAnswer: q.type === 'choice' ? q.options[q.correctAnswer] : q.answer,
          answer: q.answer,
          id: q.id,
        }];
        // Pause BGM on wrong answer
        pauseBGMOnWrong();
      }
      
      newState.answers = [...prev.answers, { questionIndex, isCorrect }];
      return newState;
    });
  }, []);

  const handleNextQuestion = useCallback(() => {
    const nextIdx = gameState.currentQuestion + 1;
    
    if (nextIdx >= 100) {
      stopBGM();
      setScreen('final');
      return;
    }

    // Resume BGM & update track (switches to final.mp3 for Q86..100)
    resumeBGMOnNext(nextIdx);

    // Check for milestone (after questions 25, 50, 75)
    const milestones = [25, 50, 75];
    if (milestones.includes(nextIdx)) {
      const texts = {
        25: 'ЧЕТВЕРТЬ ПУТИ ПРОЙДЕНА',
        50: 'ПОЛОВИНА ПУТИ ПРОЙДЕНА',
        75: 'ТРИ ЧЕТВЕРТИ ПОЗАДИ',
      };
      setMilestoneData({ number: nextIdx, total: 100, text: texts[nextIdx] });
      setTimeout(() => setMilestoneData(null), 2000);
    }

    // Check for base transition: ONLY trigger if next base has NEVER been seen yet
    const nextBase = questions[nextIdx].baseCode;
    const seenBases = gameState.seenBases || ['1.1'];
    
    if (!seenBases.includes(nextBase)) {
      // First time entering this new base!
      setGameState(prev => ({
        ...prev,
        seenBases: [...(prev.seenBases || ['1.1']), nextBase],
      }));
      setBaseTransitionData({
        baseCode: nextBase,
        base: questions[nextIdx].base,
      });
      setPendingQuestion(nextIdx);
      setScreen('base-transition');
      return;
    }

    setGameState(prev => ({ ...prev, currentQuestion: nextIdx }));
  }, [gameState.currentQuestion, gameState.seenBases]);

  const handleSkip = useCallback((questionIndex) => {
    const q = questions[questionIndex];
    const author = q.author; // erka or buddy
    
    // Pause BGM on skip
    pauseBGMOnWrong();

    setGameState(prev => {
      const newState = { ...prev };
      const scoreKey = author === 'erka' ? 'erkaScore' : 'buddyScore';
      newState[scoreKey] = { ...prev[scoreKey] };
      
      // Increment wrong count for current player
      newState[scoreKey].wrong = prev[scoreKey].wrong + 1;
      
      // Record into mistakes
      newState.mistakes = [...prev.mistakes, {
        questionIndex,
        question: q.question,
        type: q.type,
        author: q.author,
        authorName: q.author === 'erka' ? 'Кадырбекова Еркеназ' : 'Торгаутова Алсу',
        chosenIndex: null,
        chosenText: 'Вопрос пропущен участником',
        correctAnswer: q.type === 'choice' ? q.options[q.correctAnswer] : q.answer,
        answer: q.answer,
        id: q.id,
        isSkipped: true,
      }];
      
      newState.answers = [...prev.answers, { questionIndex, isCorrect: false, isSkipped: true }];
      return newState;
    });

    // Advance to next question
    handleNextQuestion();
  }, [handleNextQuestion]);

  const handleShowMistakes = useCallback(() => {
    stopBGM();
    setScreen('mistakes');
  }, []);

  const handleBackFromMistakes = useCallback(() => {
    setScreen('final');
  }, []);

  const handleRestart = useCallback(() => {
    stopBGM();
    clearState();
    setGameState(getInitialGameState());
    setHasSave(false);
    setScreen('intro');
  }, []);

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen
          onStart={handleStart}
          onContinue={hasSave ? handleContinue : null}
          onReset={() => { clearState(); setHasSave(false); }}
          hasSave={hasSave}
        />
      )}

      {screen === 'quiz' && (
        <QuizScreen
          question={questions[gameState.currentQuestion]}
          questionIndex={gameState.currentQuestion}
          totalQuestions={100}
          erkaScore={gameState.erkaScore}
          buddyScore={gameState.buddyScore}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onSkip={handleSkip}
        />
      )}

      {screen === 'base-transition' && baseTransitionData && (
        <BaseTransition
          baseCode={baseTransitionData.baseCode}
          baseName={baseTransitionData.base}
          onDone={handleBaseTransitionDone}
        />
      )}

      {milestoneData && (
        <MilestoneOverlay
          number={milestoneData.number}
          total={milestoneData.total}
          text={milestoneData.text}
          onDone={handleMilestoneDone}
        />
      )}

      {screen === 'final' && (
        <FinalScreen
          erkaScore={gameState.erkaScore}
          buddyScore={gameState.buddyScore}
          mistakes={gameState.mistakes}
          onShowMistakes={handleShowMistakes}
          onRestart={handleRestart}
        />
      )}

      {screen === 'mistakes' && (
        <MistakesScreen
          mistakes={gameState.mistakes}
          onBack={handleBackFromMistakes}
        />
      )}
    </>
  );
}
