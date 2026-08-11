import { useState } from 'react';
import { isAudioMuted, toggleAudioMute, getAudioVolume, setAudioVolume, playClickSound } from '../utils/audio';

export default function QuestionHeader({ question, questionIndex, totalQuestions, erkaScore, buddyScore, onSkip }) {
  const [muted, setMuted] = useState(isAudioMuted());
  const [volume, setVolume] = useState(getAudioVolume());
  const currentPlayer = question.author;
  const playerName = currentPlayer === 'erka' ? 'ХОД: ЕРКЕНАЗ' : 'ХОД: АЛСУ';

  const handleToggleSound = () => {
    const nextMuted = toggleAudioMute();
    setMuted(nextMuted);
    setVolume(getAudioVolume());
    if (!nextMuted) playClickSound();
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    const isZero = setAudioVolume(newVol) === 0;
    setMuted(isZero);
  };

  return (
    <div className="quiz-header">
      <div className="quiz-header-left">
        <div className="quiz-subject">ОСНОВЫ ПРАВА</div>
        <div className="quiz-topic" title={question.topic}>{question.topic}</div>
      </div>

      <div className="quiz-header-center">
        <div className="quiz-question-num">
          ВОПРОС {questionIndex + 1} / {totalQuestions}
        </div>
        <div className={`quiz-turn ${currentPlayer}`}>
          <span className="turn-indicator-dot" />
          {playerName}
        </div>
      </div>

      <div className="quiz-header-right">
        <ScoreBoard erkaScore={erkaScore} buddyScore={buddyScore} />

        <button
          className="skip-question-btn"
          onClick={onSkip}
          title="Пропустить вопрос (будет засчитана ошибка текущему участнику)"
        >
          <span className="skip-icon">⏭</span>
          <span className="skip-text">ПРОПУСТИТЬ</span>
        </button>

        {/* Audio Volume Control Widget */}
        <div className="audio-volume-widget">
          <button
            className={`sound-toggle-btn ${muted || volume === 0 ? 'muted' : ''}`}
            onClick={handleToggleSound}
            title={muted || volume === 0 ? 'Включить звук' : 'Выключить звук'}
            aria-label="Sound Toggle"
          >
            {muted || volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'}
          </button>

          <div className="volume-slider-bar" title={`Громкость: ${Math.round(volume * 100)}%`}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-range-input"
              aria-label="Громкость"
            />
            <span className="volume-percent">{muted ? '0%' : `${Math.round(volume * 100)}%`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreBoard({ erkaScore, buddyScore }) {
  return (
    <div className="scoreboard">
      <div className="score-player erka-score">
        <div className="score-name">ЕРКЕНАЗ</div>
        <div className="score-details">
          <span className="score-correct">{erkaScore.correct} ✓</span>
          <span className="score-sep">·</span>
          <span className="score-wrong">{erkaScore.wrong} ✕</span>
        </div>
      </div>
      <div className="score-divider" />
      <div className="score-player buddy-score">
        <div className="score-name">АЛСУ</div>
        <div className="score-details">
          <span className="score-correct">{buddyScore.correct} ✓</span>
          <span className="score-sep">·</span>
          <span className="score-wrong">{buddyScore.wrong} ✕</span>
        </div>
      </div>
    </div>
  );
}
