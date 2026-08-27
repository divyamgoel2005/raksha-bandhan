// Audio Manager for "Tenu Sang Rakhna" & Festival Sound Effects

let audioCtx = null;
const listeners = new Set();

function notifyState(isPlaying) {
  listeners.forEach((cb) => {
    try {
      cb(isPlaying);
    } catch {}
  });
}

function getAudioElement() {
  if (typeof document === 'undefined') return null;
  let el = document.getElementById('rk-bg-audio');
  if (!el) {
    el = new Audio('/Tenu-Sang-Rakhna-trimmed.mp3');
    el.id = 'rk-bg-audio';
    el.loop = true;
    el.volume = 0.75;
    el.preload = 'auto';
    el.playsInline = true;
    document.body?.appendChild(el);
  }
  return el;
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx || audioCtx.state === 'closed') {
    try {
      audioCtx = new AudioContextClass();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

export function initBackgroundSong() {
  const song = getAudioElement();
  if (song && !song.__hasListeners) {
    song.__hasListeners = true;
    song.addEventListener('play', () => notifyState(true));
    song.addEventListener('pause', () => notifyState(false));
    song.addEventListener('ended', () => {
      song.currentTime = 0;
      song.play().catch(() => {});
    });
  }
  return song;
}

export function subscribeAudioState(callback) {
  listeners.add(callback);
  const song = getAudioElement();
  if (song) {
    callback(!song.paused);
  }
  return () => listeners.delete(callback);
}

export function isAudioPlaying() {
  const song = getAudioElement();
  return song ? !song.paused : false;
}

export function playDrone() {
  const song = initBackgroundSong();
  if (!song) return;

  try {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  } catch {}

  const p = song.play();
  if (p && typeof p.then === 'function') {
    p.then(() => {
      notifyState(true);
    }).catch(() => {
      // Fallback gesture listeners
      const onUserGesture = () => {
        song.play().then(() => {
          notifyState(true);
          cleanup();
        }).catch(() => {});
      };

      const cleanup = () => {
        ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown'].forEach((evt) => {
          window.removeEventListener(evt, onUserGesture, true);
          document.removeEventListener(evt, onUserGesture, true);
        });
      };

      ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, onUserGesture, { once: true, capture: true, passive: true });
        document.addEventListener(evt, onUserGesture, { once: true, capture: true, passive: true });
      });
    });
  }
}

export function stopDrone() {
  const song = getAudioElement();
  if (song) {
    song.pause();
    notifyState(false);
  }
}

export function setSongVolume(vol) {
  const song = getAudioElement();
  if (song) {
    song.volume = Math.max(0, Math.min(1, vol));
  }
}

export function playSoundEffect(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;

    const playTone = (freq, startOffset, duration, waveType = 'sine', peakGain = 0.08) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, now + startOffset);
      gain.gain.setValueAtTime(0, now + startOffset);
      gain.gain.linearRampToValueAtTime(peakGain, now + startOffset + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration + 0.05);
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {}
      };
    };

    switch (type) {
      case 'bell':
        [880, 1174.66, 880].forEach((freq, idx) => {
          playTone(freq, 0.18 * idx, 0.6, 'sine', 0.12);
        });
        break;
      case 'shankh':
        playTone(196, 0, 1.4, 'sawtooth', 0.07);
        playTone(293.66, 0.1, 1.2, 'triangle', 0.06);
        playTone(392, 0.2, 0.9, 'sine', 0.05);
        break;
      case 'flute':
        [523.25, 587.33, 659.25, 698.46, 783.99].forEach((freq, idx) => {
          playTone(freq, 0.18 * idx, 0.4, 'sine', 0.08);
        });
        break;
      case 'aarti':
        [392, 523.25, 659.25, 783.99].forEach((freq, idx) => {
          playTone(freq, 0.15 * idx, 0.5, 'sine', 0.07);
        });
        break;
      case 'unwrap':
        playTone(220, 0, 0.18, 'square', 0.04);
        playTone(330, 0.12, 0.25, 'sine', 0.06);
        break;
      case 'sweet':
        playTone(440, 0, 0.22, 'sine', 0.08);
        playTone(554.37, 0.1, 0.3, 'sine', 0.07);
        playTone(659.25, 0.2, 0.35, 'sine', 0.06);
        break;
      case 'crack':
        playTone(180, 0, 0.12, 'triangle', 0.09);
        playTone(480, 0.05, 0.3, 'sine', 0.08);
        playTone(960, 0.12, 0.4, 'sine', 0.07);
        break;
      default:
        playTone(440, 0, 0.2, 'sine', 0.05);
    }
  } catch {}
}
