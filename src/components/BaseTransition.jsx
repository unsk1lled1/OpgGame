import { useEffect } from 'react';
import { baseNames } from '../data/sceneConfig';
import { playTransitionSound } from '../utils/audio';

export default function BaseTransition({ baseCode, baseName, onDone }) {
  const info = baseNames[baseCode] || { title: baseCode, subtitle: baseName };

  useEffect(() => {
    playTransitionSound();
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  // Click to skip immediately
  const handleClick = () => {
    onDone();
  };

  return (
    <div className="base-transition" onClick={handleClick} role="button" tabIndex={0}>
      <div className="base-transition-backdrop" />
      <div className="base-transition-content">
        <div className="base-transition-seal">§</div>
        <div className="base-transition-label">ОСНОВЫ ПРАВА · НОВЫЙ РАЗДЕЛ</div>
        <h2 className="base-transition-title">{info.title}</h2>
        <div className="base-transition-line" />
        <p className="base-transition-subtitle">{info.subtitle}</p>
        <div className="base-transition-skip-hint">нажмите для пропуска →</div>
      </div>
    </div>
  );
}
