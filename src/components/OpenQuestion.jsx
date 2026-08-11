import { useState } from 'react';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/audio';

export default function OpenQuestion({ question, questionIndex, onAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [judged, setJudged] = useState(false);
  const [judgedState, setJudgedState] = useState(null); // 'correct' | 'wrong'

  const handleShowAnswer = () => {
    playClickSound();
    setShowAnswer(true);
  };

  const handleJudge = (isCorrect) => {
    if (judged) return;
    setJudged(true);
    setJudgedState(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    onAnswer(questionIndex, isCorrect, null, null);
  };

  return (
    <div className="open-question-area">
      {!showAnswer && (
        <div className="open-prompt-box">
          <p className="open-oral-hint">
            <span className="hint-icon">⚖</span> Ответьте на вопрос устно, затем проверьте правильность по эталону.
          </p>
          <button className="show-answer-btn" onClick={handleShowAnswer}>
            ПОКАЗАТЬ ЭТАЛОННЫЙ ОТВЕТ
          </button>
        </div>
      )}

      {showAnswer && (
        <div className="open-answer-reveal">
          <div className="open-answer-label">
            <span className="label-dot" /> ЭТАЛОННЫЙ ОТВЕТ ИЗ БАЗЫ
          </div>
          <div className="open-answer-text">{question.answer}</div>
        </div>
      )}

      {showAnswer && !judged && (
        <div className="open-judge-section">
          <div className="open-judge-title">Оцените устный ответ:</div>
          <div className="open-judge-buttons">
            <button
              className="judge-btn correct-btn"
              onClick={() => handleJudge(true)}
            >
              <span className="btn-icon">✓</span> ЗАСЧИТАТЬ
            </button>
            <button
              className="judge-btn wrong-btn"
              onClick={() => handleJudge(false)}
            >
              <span className="btn-icon">✕</span> НЕ ЗАСЧИТАТЬ
            </button>
          </div>
        </div>
      )}

      {judged && (
        <div className={`judge-status-banner ${judgedState}`}>
          {judgedState === 'correct' ? (
            <span>✓ Ответ засчитан текущему участнику</span>
          ) : (
            <span>✕ Ответ не засчитан (добавлен в разбор ошибок)</span>
          )}
        </div>
      )}
    </div>
  );
}
