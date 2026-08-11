import { playClickSound } from '../utils/audio';

export default function FinalScreen({ erkaScore, buddyScore, mistakes, onShowMistakes, onRestart }) {
  const erkaTotal = erkaScore.correct;
  const buddyTotal = buddyScore.correct;
  const totalCorrect = erkaTotal + buddyTotal;
  const totalWrong = erkaScore.wrong + buddyScore.wrong;
  const erkaPercent = Math.round((erkaTotal / 50) * 100);
  const buddyPercent = Math.round((buddyTotal / 50) * 100);
  const totalPercent = Math.round((totalCorrect / 100) * 100);

  const handleMistakesClick = () => {
    playClickSound();
    onShowMistakes();
  };

  const handleRestartClick = () => {
    playClickSound();
    onRestart();
  };

  return (
    <div className="final-screen">
      <div className="final-decorative">
        <div className="deco-word">IUSTITIA</div>
        <div className="deco-seal">⚖</div>
      </div>

      <div className="final-content">
        <div className="final-label">ОСНОВЫ ПРАВА · ИТОГОВЫЙ ПРОТОКОЛ</div>

        <h1 className="final-title">
          ПАРНАЯ РАБОТА<br />ЗАВЕРШЕНА
        </h1>

        <div className="final-gold-line" />

        {/* Combined Overall Statistics */}
        <div className="final-total-section">
          <div className="final-total-label">СОВМЕСТНЫЙ РЕЗУЛЬТАТ ПАРЫ</div>
          <div className="final-total-score">{totalCorrect} / 100</div>
          <div className="final-total-details">
            <span className="total-badge correct-badge">✓ {totalCorrect} верных ответов ({totalPercent}%)</span>
            <span className="total-badge wrong-badge">✕ {totalWrong} ошибок</span>
          </div>
        </div>

        {/* Player Dual Score Overview */}
        <div className="final-scores">
          {/* Кадырбекова Еркеназ */}
          <div className="final-player-card">
            <div className="final-card-header">
              <span className="final-avatar">⚖</span>
              <span className="final-player-name">КАДЫРБЕКОВА ЕРКЕНАЗ</span>
            </div>
            <div className="final-player-score-large">{erkaTotal}</div>
            <div className="final-player-denominator">из 50 вопросов</div>
            <div className="final-player-progress">
              <div className="final-player-progress-bar" style={{ width: `${erkaPercent}%` }} />
            </div>
            <div className="final-player-metrics">
              <span className="metric-pct">{erkaPercent}% успеха</span>
              <span className="metric-mistakes">{erkaScore.wrong} ош.</span>
            </div>
          </div>

          {/* Торгаутова Алсу */}
          <div className="final-player-card">
            <div className="final-card-header">
              <span className="final-avatar">⚜</span>
              <span className="final-player-name">ТОРГАУТОВА АЛСУ</span>
            </div>
            <div className="final-player-score-large">{buddyTotal}</div>
            <div className="final-player-denominator">из 50 вопросов</div>
            <div className="final-player-progress">
              <div className="final-player-progress-bar" style={{ width: `${buddyPercent}%` }} />
            </div>
            <div className="final-player-metrics">
              <span className="metric-pct">{buddyPercent}% успеха</span>
              <span className="metric-mistakes">{buddyScore.wrong} ош.</span>
            </div>
          </div>
        </div>

        {/* Inspiring Legal Quote */}
        <blockquote className="final-quote">
          «Знание права начинается с понимания его принципов.»
        </blockquote>

        {/* Action buttons */}
        <div className="final-buttons">
          {mistakes.length > 0 && (
            <button className="final-btn primary" onClick={handleMistakesClick}>
              <span>ПОСМОТРЕТЬ ОШИБКИ</span>
              <span className="btn-count">({mistakes.length})</span>
            </button>
          )}
          <button className="final-btn secondary" onClick={handleRestartClick}>
            ПРОЙТИ ЗАНОВО
          </button>
        </div>
      </div>
    </div>
  );
}
