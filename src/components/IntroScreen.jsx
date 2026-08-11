export default function IntroScreen({ onStart, onContinue, onReset, hasSave }) {
  return (
    <div className="intro-screen">
      {/* Decorative background */}
      <div className="intro-decorative-bg">
        <span className="deco-symbol">§</span>
        <span className="deco-symbol">⚖</span>
        <span className="deco-symbol">⚜</span>
        <div className="deco-line" />
        <div className="deco-line" />
        <div className="deco-line" />
      </div>

      <div className="intro-content">
        <div className="intro-subject-label">ПАРНАЯ РАБОТА · ИНТЕРАКТИВНЫЙ КВИЗ</div>

        <h1 className="intro-title">
          <span className="line1">ОСНОВЫ</span>
          <span className="line2">ПРАВА</span>
        </h1>

        <div className="intro-gold-line" />

        <div className="intro-stats">
          <span>100 вопросов</span>
          <span className="stat-divider" />
          <span>2 участника</span>
          <span className="stat-divider" />
          <span>4 базы</span>
        </div>

        <div className="intro-players">
          Кадырбекова Еркеназ<span className="multiply">×</span>Торгаутова Алсу
        </div>

        <div className="intro-motto">
          <span>ПРАВО</span>
          <span className="dot" />
          <span>ЗАКОН</span>
          <span className="dot" />
          <span>СПРАВЕДЛИВОСТЬ</span>
        </div>

        {hasSave ? (
          <div className="intro-continue-section">
            <button className="intro-continue-btn" onClick={onContinue}>
              ПРОДОЛЖИТЬ
            </button>
            <br />
            <button className="intro-reset-btn" onClick={() => { onReset(); }}>
              или начать заново
            </button>
            <br /><br />
            <button className="intro-btn" onClick={onStart}>
              НАЧАТЬ ЗАНОВО
            </button>
          </div>
        ) : (
          <button className="intro-btn" onClick={onStart}>
            НАЧАТЬ
          </button>
        )}
      </div>
    </div>
  );
}
