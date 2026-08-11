import defaultAudioUrl from '../audio/default.mp3';
import finalAudioUrl from '../audio/final.mp3';

// Centralized Web Audio synthesis + BGM Controller
let audioCtx = null;
let isMuted = localStorage.getItem('op-quiz-muted') === 'true';
let currentVolume = parseFloat(localStorage.getItem('op-quiz-volume') || '0.7');

// BGM Audio State
let bgAudio = null;
let currentTrack = null; // 'default' | 'final'
let isPausedDueToWrong = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function getBgAudioInstance() {
  if (!bgAudio) {
    bgAudio = new Audio();
    bgAudio.loop = true;
    bgAudio.volume = currentVolume * 0.35; // Ideal background balance
  }
  return bgAudio;
}

export function isAudioMuted() {
  return isMuted || currentVolume === 0;
}

export function getAudioVolume() {
  return currentVolume;
}

export function setAudioVolume(vol) {
  const normalized = Math.max(0, Math.min(1, parseFloat(vol)));
  currentVolume = normalized;
  localStorage.setItem('op-quiz-volume', String(normalized));

  if (bgAudio) {
    bgAudio.volume = normalized * 0.35;
  }

  if (normalized === 0) {
    isMuted = true;
    localStorage.setItem('op-quiz-muted', 'true');
    if (bgAudio) bgAudio.pause();
  } else {
    if (isMuted) {
      isMuted = false;
      localStorage.setItem('op-quiz-muted', 'false');
      if (bgAudio && !isPausedDueToWrong && currentTrack) {
        bgAudio.play().catch(() => {});
      }
    }
  }

  return currentVolume;
}

export function toggleAudioMute() {
  if (isMuted || currentVolume === 0) {
    isMuted = false;
    if (currentVolume === 0) {
      setAudioVolume(0.7);
    } else {
      localStorage.setItem('op-quiz-muted', 'false');
    }
    if (bgAudio && !isPausedDueToWrong && currentTrack) {
      bgAudio.play().catch(() => {});
    }
  } else {
    isMuted = true;
    localStorage.setItem('op-quiz-muted', 'true');
    if (bgAudio) bgAudio.pause();
  }
  return isMuted;
}

// BGM Management Functions
export function startBGM(questionIndex = 0) {
  const audio = getBgAudioInstance();
  const targetTrack = questionIndex >= 85 ? 'final' : 'default';
  const targetUrl = targetTrack === 'final' ? finalAudioUrl : defaultAudioUrl;

  isPausedDueToWrong = false;

  if (currentTrack !== targetTrack || audio.src !== targetUrl) {
    currentTrack = targetTrack;
    audio.src = targetUrl;
  }

  audio.volume = currentVolume * 0.35;

  if (!isMuted && currentVolume > 0) {
    audio.play().catch(() => {
      // Browser autoplay policy might require user interaction
    });
  }
}

export function updateBGMTrack(nextQuestionIndex) {
  const audio = getBgAudioInstance();
  const targetTrack = nextQuestionIndex >= 85 ? 'final' : 'default';
  const targetUrl = targetTrack === 'final' ? finalAudioUrl : defaultAudioUrl;

  isPausedDueToWrong = false;

  if (currentTrack !== targetTrack) {
    currentTrack = targetTrack;
    audio.src = targetUrl;
  }

  audio.volume = currentVolume * 0.35;

  if (!isMuted && currentVolume > 0) {
    audio.play().catch(() => {});
  }
}

export function pauseBGMOnWrong() {
  isPausedDueToWrong = true;
  if (bgAudio) {
    bgAudio.pause();
  }
}

export function resumeBGMOnNext(nextQuestionIndex) {
  isPausedDueToWrong = false;
  updateBGMTrack(nextQuestionIndex);
}

export function stopBGM() {
  if (bgAudio) {
    bgAudio.pause();
    currentTrack = null;
  }
  isPausedDueToWrong = false;
}

// Sound effects with volume scaling
export function playCorrectSound() {
  if (isMuted || currentVolume === 0) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (maj7 arpeggio)
    const masterGain = (0.12 * currentVolume);

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(masterGain / (idx + 1), now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.0);
    });
  } catch (e) {
    // Graceful fallback
  }
}

export function playWrongSound() {
  if (isMuted || currentVolume === 0) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const masterGain = (0.12 * currentVolume);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now); // A3
    osc.frequency.exponentialRampToValueAtTime(164.81, now + 0.35); // E3

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(masterGain, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {
    // Graceful fallback
  }
}

export function playClickSound() {
  if (isMuted || currentVolume === 0) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const masterGain = (0.05 * currentVolume);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(masterGain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Graceful fallback
  }
}

export function playTransitionSound() {
  if (isMuted || currentVolume === 0) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [392.00, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
    const masterGain = (0.08 * currentVolume);

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);

      gain.gain.setValueAtTime(0.001, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(masterGain, now + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 1.3);
    });
  } catch (e) {
    // Graceful fallback
  }
}
