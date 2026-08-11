export default function ProgressBar({ currentIndex, totalQuestions }) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // Define base segments with their question ranges
  const segments = [
    { code: '1.1', label: 'БАЗА I', end: 24 },   // questions 0-23 (ids 1-24)
    { code: '1.2', label: 'БАЗА II', end: 48 },   // questions 24-47 (ids 25-48ish)
    { code: '1.3', label: 'БАЗА III', end: 74 },  // questions 48-73
    { code: '1.4', label: 'БАЗА IV', end: 99 },   // questions 74-99
  ];

  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-segments">
        {segments.map((seg, i) => {
          const isActive = currentIndex >= (i === 0 ? 0 : segments[i - 1].end + 1) && currentIndex <= seg.end;
          const isCompleted = currentIndex > seg.end;
          return (
            <div key={seg.code} className="progress-segment">
              <div className={`progress-segment-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} />
              <span className="progress-segment-label">{seg.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
