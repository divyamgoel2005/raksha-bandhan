import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect } from '../audio/synth';

export default function RakhiTyingStep({ receiverName = "Muskan", brotherName = "Divyam", selectedRakhi, onComplete }) {
  const [tieProgress, setTieProgress] = useState(0); // 0 = ready, 1 = wrapped, 2 = tied
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTieStep = () => {
    if (isAnimating || tieProgress >= 2) return;

    if (tieProgress === 0) {
      setIsAnimating(true);
      playSoundEffect('flute');
      setTieProgress(1);
      setTimeout(() => setIsAnimating(false), 700);
    } else if (tieProgress === 1) {
      setIsAnimating(true);
      playSoundEffect('shankh');
      playSoundEffect('bell');
      setTieProgress(2);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#fbbf24', '#f59e0b', '#ec4899', '#ffffff']
      });
      setTimeout(() => setIsAnimating(false), 900);
    }
  };

  const handleContinue = () => {
    playSoundEffect('bell');
    onComplete();
  };

  return (
    <motion.div 
      className="rk-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="rk-badge">Step 3 of 7 • Sacred Knot</div>
      <h2 className="rk-title">Tie Sacred Rakhi 🧵</h2>
      <p className="rk-subtitle">
        {tieProgress === 2 
          ? `The sacred ${selectedRakhi.label} is tied on ${brotherName}'s wrist with your blessings and his lifelong promise of protection!`
          : `Tap to wrap and bind the sacred silk thread on ${brotherName}'s wrist.`}
      </p>

      {/* Wrist Interaction Stage */}
      <div 
        className={`rk-wrist-stage ${tieProgress === 2 ? 'tied-glow' : ''}`}
        onClick={handleTieStep}
        role="button"
        tabIndex={0}
      >
        {/* Sacred Aura Background */}
        <div className="wrist-aura-glow" />

        {/* Wrist Silhouette */}
        <div className="wrist-arm">
          <div className="wrist-cuff" />
          
          {/* Rakhi Thread winding animation */}
          <div className={`wrist-thread-wrap step-${tieProgress}`}>
            <svg viewBox="0 0 200 120" className="thread-svg">
              {/* Thread line 1 */}
              <path
                d="M 10,60 C 60,35 140,35 190,60"
                stroke="#dc2626"
                strokeWidth="4"
                fill="none"
                strokeDasharray={tieProgress >= 1 ? "none" : "8, 4"}
                className={tieProgress >= 1 ? "thread-drawn" : ""}
              />
              <path
                d="M 10,60 C 60,85 140,85 190,60"
                stroke="#fbbf24"
                strokeWidth="3"
                fill="none"
                strokeDasharray={tieProgress >= 1 ? "none" : "8, 4"}
                className={tieProgress >= 1 ? "thread-drawn" : ""}
              />
            </svg>
          </div>

          {/* Center Rakhi Medallion */}
          <div className={`wrist-rakhi-center ${tieProgress >= 1 ? 'placed' : ''}`}>
            <div className="wrist-rakhi-halo" />
            <div className="wrist-rakhi-badge">
              <span className="wrist-rakhi-icon">{selectedRakhi.icon}</span>
            </div>
          </div>

          {/* Knot Tying Finish */}
          {tieProgress === 2 && (
            <div className="wrist-knot-complete">
              <span className="knot-sparkle">✨</span>
              <span className="knot-blessing">ॐ</span>
              <span className="knot-sparkle">✨</span>
            </div>
          )}
        </div>

        <div className="wrist-hint-text">
          {tieProgress === 0 && `👉 Tap ${brotherName}'s wrist to wind the silk thread`}
          {tieProgress === 1 && `👉 Tap again to tie the sacred knot`}
          {tieProgress === 2 && `✨ Sacred bond tied on ${brotherName}'s wrist!`}
        </div>
      </div>

      {/* Action CTA */}
      {tieProgress < 2 ? (
        <button className="rk-btn rk-btn-pulse" onClick={handleTieStep}>
          {tieProgress === 0 ? `Wrap Silk Thread on ${brotherName} 🧵` : "Tie Sacred Knot 🪷"}
        </button>
      ) : (
        <button className="rk-btn" onClick={handleContinue}>
          Feed Sweets to {brotherName} 🍬 →
        </button>
      )}
    </motion.div>
  );
}
