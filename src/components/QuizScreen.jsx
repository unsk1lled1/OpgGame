import { useState, useEffect, useCallback } from 'react';
import SceneBackground from './SceneBackground';
import QuestionHeader from './QuestionHeader';
import ProgressBar from './ProgressBar';
import ChoiceOptions from './ChoiceOptions';
import OpenQuestion from './OpenQuestion';
import { resolveQuestionScene } from '../data/sceneResolver';
import { playClickSound, playWrongSound } from '../utils/audio';

export default function QuizScreen({
  question,
  questionIndex,
  totalQuestions,
  erkaScore,
  buddyScore,
  onAnswer,
  onNext,
  onSkip,
}) {
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
  }, [questionIndex]);

  const handleAnswer = useCallback((qIdx, isCorrect, chosenIndex, chosenText) => {
    setAnswered(true);
    onAnswer(qIdx, isCorrect, chosenIndex, chosenText);
  }, [onAnswer]);

  const handleNextClick = () => {
    playClickSound();
    onNext();
  };

  const handleSkipClick = () => {
    playWrongSound();
    onSkip(questionIndex);
  };

  const scene = resolveQuestionScene(question, questionIndex);
  const imageUrl = scene.hasImage ? scene.image : null;

  // Auto-center layout when there is no side photo card
  const layoutVariant = imageUrl ? (scene.layoutVariant || 'A') : 'B';

  const baseLabel = question.base.split('·')[0]?.trim() || question.base;

  return (
    <div className="quiz-screen">
      <SceneBackground
        question={question}
        questionIndex={questionIndex}
      />

      <div className="quiz-content">
        <QuestionHeader
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          erkaScore={erkaScore}
          buddyScore={buddyScore}
          onSkip={handleSkipClick}
        />

        <ProgressBar
          currentIndex={questionIndex}
          totalQuestions={totalQuestions}
        />

        {/* Animated Question Container with smooth key-based entry */}
        <div className={`question-area layout-${layoutVariant}`} key={`q-area-${question.id}`}>
          {/* Main Question Panel */}
          <div className="question-panel">
            {/* Top metadata tags */}
            <div className="panel-meta-bar">
              <div className="question-base-badge">
                <span className="badge-bullet">§</span>
                <span>{baseLabel}</span>
              </div>
              <div className="question-type-badge">
                {question.type === 'choice' ? `Тест · ${question.options.length} вар.` : 'Устный ответ'}
              </div>
            </div>

            {/* Question Text */}
            <div className="question-text">
              {question.question}
            </div>

            {/* Answer component */}
            {question.type === 'choice' ? (
              <ChoiceOptions
                key={`choice-${question.id}`}
                question={question}
                questionIndex={questionIndex}
                onAnswer={handleAnswer}
              />
            ) : (
              <OpenQuestion
                key={`open-${question.id}`}
                question={question}
                questionIndex={questionIndex}
                onAnswer={handleAnswer}
              />
            )}

            {/* Next question button */}
            {answered && (
              <div className="next-btn-container">
                <button className="next-btn" onClick={handleNextClick}>
                  {questionIndex < totalQuestions - 1 ? (
                    <>
                      <span>СЛЕДУЮЩИЙ ВОПРОС</span>
                      <span className="arrow">→</span>
                    </>
                  ) : (
                    <>
                      <span>ЗАВЕРШИТЬ ВИКТОРИНУ</span>
                      <span className="arrow">★</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Layout Variant A Side Visual Card (ONLY rendered when imageUrl exists) */}
          {layoutVariant === 'A' && imageUrl && (
            <div className="side-visual-card" key={`side-visual-${question.id}`}>
              <div
                className="side-visual-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
              >
                <div className="side-visual-overlay">
                  <div className="side-visual-seal">{scene.symbol || '⚖'}</div>
                  <div className="side-visual-tag">{scene.tag}</div>
                  <div className="side-visual-theme">{scene.title || question.topic}</div>
                  <div className="side-visual-motto">{scene.latinQuote}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
