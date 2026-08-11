import { useEffect } from 'react';

export default function MilestoneOverlay({ number, total, text, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="milestone-overlay" onClick={onDone} role="button" tabIndex={0}>
      <div className="milestone-content">
        <div className="milestone-number">{number}</div>
        <div className="milestone-divider">/</div>
        <div className="milestone-total">{total}</div>
        <div className="milestone-text">{text}</div>
      </div>
    </div>
  );
}
