import { useState } from 'react';
import { playClickSound } from '../utils/audio';

export default function MistakesScreen({ mistakes, onBack }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'erka' | 'buddy'

  const filteredMistakes = mistakes.filter((m) => {
    if (filter === 'erka') return m.author === 'erka';
    if (filter === 'buddy') return m.author === 'buddy';
    return true;
  });

  const erkaMistakesCount = mistakes.filter((m) => m.author === 'erka').length;
  const buddyMistakesCount = mistakes.filter((m) => m.author === 'buddy').length;

  const handleBackClick = () => {
    playClickSound();
    onBack();
  };

  const handleFilterChange = (newFilter) => {
    playClickSound();
    setFilter(newFilter);
  };

  return (
    <div className="mistakes-screen">
      {/* Editorial Top Navigation */}
      <div className="mistakes-topbar">
        <button className="mistakes-back-link" onClick={handleBackClick}>
          ← НАЗАД К РЕЗУЛЬТАТАМ
        </button>
        <div className="mistakes-top-title">АРХИВ ДЕЛ И РАЗБОР ОШИБОК</div>
      </div>

      <div className="mistakes-header">
        <div className="mistakes-label">LEGAL REVIEW & CASE ARCHIVE</div>
        <h1 className="mistakes-title">РАЗБОР ОШИБОК</h1>
        <p className="mistakes-count">
          Всего зафиксировано {mistakes.length} {getMistakeDeclension(mistakes.length)} из 100 вопросов
        </p>

        {/* Filter Pills */}
        <div className="mistakes-filter-bar">
          <button
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Все ошибки ({mistakes.length})
          </button>
          <button
            className={`filter-pill ${filter === 'erka' ? 'active' : ''}`}
            onClick={() => handleFilterChange('erka')}
          >
            Кадырбекова Еркеназ ({erkaMistakesCount})
          </button>
          <button
            className={`filter-pill ${filter === 'buddy' ? 'active' : ''}`}
            onClick={() => handleFilterChange('buddy')}
          >
            Торгаутова Алсу ({buddyMistakesCount})
          </button>
        </div>
      </div>

      {/* Case List */}
      <div className="mistakes-list">
        {filteredMistakes.map((m, i) => (
          <div
            key={`mistake-${m.id}`}
            className="mistake-card"
            style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
          >
            <div className="mistake-card-header">
              <div className="mistake-card-meta">
                <span className="mistake-num">ВОПРОС № {m.id}</span>
                <span className="mistake-type-pill">
                  {m.type === 'choice' ? 'Тестовый вопрос' : 'Устный вопрос'}
                </span>
                {m.isSkipped && (
                  <span className="mistake-skipped-badge">ПРОПУЩЕН</span>
                )}
              </div>
              <span className={`mistake-player ${m.author}`}>
                {m.author === 'erka' ? 'ОШИБКА: ЕРКЕНАЗ' : 'ОШИБКА: АЛСУ'}
              </span>
            </div>

            <div className="mistake-question">{m.question}</div>

            {m.isSkipped ? (
              <div className="mistake-chosen is-skipped-box">
                <div className="mistake-chosen-label">
                  <span className="chosen-icon">⏭</span> СТАТУС
                </div>
                <div className="mistake-chosen-text">Вопрос был пропущен участником</div>
              </div>
            ) : (
              <>
                {m.type === 'choice' && m.chosenText && (
                  <div className="mistake-chosen">
                    <div className="mistake-chosen-label">
                      <span className="chosen-icon">✕</span> ВЫБРАННЫЙ ОТВЕТ (НЕВЕРНО)
                    </div>
                    <div className="mistake-chosen-text">{m.chosenText}</div>
                  </div>
                )}

                {m.type === 'open' && (
                  <div className="mistake-chosen">
                    <div className="mistake-chosen-label">
                      <span className="chosen-icon">✕</span> СТАТУС УСТНОГО ОТВЕТА
                    </div>
                    <div className="mistake-chosen-text">Ответ был отмечен участниками как неверный</div>
                  </div>
                )}
              </>
            )}

            <div className="mistake-correct">
              <div className="mistake-correct-label">
                <span className="correct-icon">✓</span> ЭТАЛОННЫЙ ПРАВИЛЬНЫЙ ОТВЕТ
              </div>
              <div className="mistake-correct-text">
                {m.type === 'choice' ? m.correctAnswer : m.answer}
              </div>
            </div>
          </div>
        ))}

        {filteredMistakes.length === 0 && (
          <div className="mistakes-empty-state">
            <div className="empty-seal">✦</div>
            <div className="empty-title">Ошибок в данной категории нет!</div>
            <div className="empty-sub">Все ответы были даны безупречно правильно.</div>
          </div>
        )}
      </div>

      <div className="mistakes-footer">
        <button className="mistakes-back-btn" onClick={handleBackClick}>
          ← ВЕРНУТЬСЯ К ИТОГАМ ВИКТОРИНЫ
        </button>
      </div>
    </div>
  );
}

function getMistakeDeclension(n) {
  if (n % 10 === 1 && n % 100 !== 11) return 'ошибка';
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return 'ошибки';
  return 'ошибок';
}
