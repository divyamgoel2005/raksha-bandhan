import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="rk-courtyard" aria-hidden="true">
      {/* Radial temple ambient lights */}
      <div className="rk-scene-texture" />
      
      {/* Decorative Courtyard Pillars */}
      <div className="rk-courtyard-pillars">
        <div className="rk-pillar left" />
        <div className="rk-pillar right" />
      </div>

      {/* Hanging Marigold Garlands */}
      <div className="rk-garland">
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className="rk-garland-flower"
            style={{ animationDelay: `${0.12 * i}s` }}
          >
            🌼
          </span>
        ))}
      </div>

      {/* Floating Petals and Sacred Sparkles */}
      <div className="rk-gold-particles">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="rk-petal"
            style={{
              left: `${(i * 6.2) % 100}%`,
              animationDelay: `${(i * 0.45) % 6}s`,
              animationDuration: `${5.5 + (i % 4)}s`,
              transform: `scale(${0.7 + (i % 5) * 0.1}) rotate(${i * 25}deg)`
            }}
          >
            {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '✨' : '🌺'}
          </span>
        ))}
      </div>
    </div>
  );
}
