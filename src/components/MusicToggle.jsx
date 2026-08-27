import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle({ isPlaying, onToggle }) {
  return (
    <button
      className={`rk-music-toggle ${isPlaying ? 'playing' : ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Mute festival music' : 'Play festival music'}
      title={isPlaying ? 'Mute music' : 'Play ambient music'}
    >
      <div className="music-icon-wrap">
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </div>
      <div className="music-bars" aria-hidden="true">
        <span style={{ animationDelay: '0s' }} />
        <span style={{ animationDelay: '0.15s' }} />
        <span style={{ animationDelay: '0.3s' }} />
      </div>
    </button>
  );
}
