import { useState } from 'react';
import { playClickSound, playCorrectSound, playWrongSound } from '../utils/audio';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function ChoiceOptions({ question, questionIndex, onAnswer }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);

  const correctIndex = question.correctAnswer;

  const handleSelect = (index) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);

    const isCorrect = index === correctIndex;
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    onAnswer(questionIndex, isCorrect, index, question.options[index]);
  };

  const getCardClass = (index) => {
    if (!answered) return 'answer-card';
    let cls = 'answer-card disabled';
    if (index === correctIndex) cls += ' correct';
    else if (index === selectedIndex) cls += ' wrong';
    else cls += ' dimmed';
    return cls;
  };

  return (
    <div className="answer-cards" role="list">
      {question.options.map((option, i) => (
        <div
          key={`${questionIndex}-opt-${i}`}
          className={getCardClass(i)}
          style={{ animationDelay: `${i * 45}ms` }}
          onClick={() => handleSelect(i)}
          role="button"
          tabIndex={answered ? -1 : 0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(i); }}
        >
          <div className="answer-letter">
            <span>{LETTERS[i]}</span>
          </div>
          <div className="answer-text">{option}</div>
          {answered && i === correctIndex && (
            <div className="answer-badge correct-badge">✓ Верно</div>
          )}
          {answered && i === selectedIndex && i !== correctIndex && (
            <div className="answer-badge wrong-badge">✕ Ошибка</div>
          )}
        </div>
      ))}
    </div>
  );
}

export { ChoiceOptions };
