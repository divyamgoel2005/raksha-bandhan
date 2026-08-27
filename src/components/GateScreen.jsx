import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect, playDrone } from '../audio/synth';

export default function GateScreen({ keepsake, onStart }) {
  const [isDiyaUnlocked, setIsDiyaUnlocked] = useState(false);

  const handleUnlockDiya = (e) => {
    e?.stopPropagation();
    if (!isDiyaUnlocked) {
      setIsDiyaUnlocked(true);
      playDrone();
      playSoundEffect('aarti');
      playSoundEffect('bell');
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#fbbf24', '#f59e0b', '#dc2626', '#ec4899', '#ffffff']
      });
    }
  };

  const handleBeginCelebration = (e) => {
    e?.stopPropagation();
    if (!isDiyaUnlocked) return;
    playDrone();
    playSoundEffect('shankh');
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#dc2626', '#10b981', '#ffffff']
    });
    onStart();
  };

  return (
    <motion.div 
      className="rk-step rk-gate-step"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="rk-badge">
        <span>✨</span> Sacred Raksha Bandhan <span>✨</span>
      </div>

      <h1 className="rk-gate-title">
        For {keepsake.receiverName || "Musu Didi"} <span className="heart-pulse">❤️</span>
      </h1>

      {/* Auspicious Sacred Diya Centerpiece */}
      <div 
        className={`rk-gate-diya-wrap ${isDiyaUnlocked ? 'unlocked' : 'pending'}`} 
        onClick={handleUnlockDiya} 
        role="button" 
        tabIndex={0} 
        title={isDiyaUnlocked ? "Diya Unlocked" : "Tap Diya to Unlock"}
      >
        <div className={`rk-inv-halo ${isDiyaUnlocked ? 'active' : ''}`} />
        <div className={`rk-inv-flame ${isDiyaUnlocked ? 'active' : ''}`}>
          <div className="rk-inv-flame-core" />
          <div className="rk-inv-flame-bloom" />
          <div className="rk-inv-flame-outer" />
        </div>
        <div className="rk-diya-brass">
          <svg viewBox="0 0 100 60" width="120" height="72" className="diya-svg">
            <defs>
              <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>
            <path
              d="M 10,25 C 25,48 75,48 90,25 C 80,42 60,54 50,55 C 40,54 20,42 10,25 Z"
              fill="url(#brassGrad)"
              stroke="#fbbf24"
              strokeWidth="1.5"
            />
            <ellipse cx="50" cy="25" rx="40" ry="10" fill="#92400e" stroke="#fef08a" strokeWidth="1" />
            <ellipse cx="50" cy="24" rx="34" ry="7" fill="#b45309" />
          </svg>
        </div>
        <div className={`diya-tap-hint ${isDiyaUnlocked ? 'done' : ''}`}>
          {isDiyaUnlocked ? "✨ Diya Unlocked & Blessed! ✨" : "👉 Tap Diya to Unlock ✨"}
        </div>
      </div>

      {/* Auspicious Devanagari Mantra */}
      <div className="rk-devanagari-box">
        <p className="rk-devanagari-verse">
          ॐ येन बद्धो बली राजा दानवेन्द्रो महाबलः।<br />
          तेन त्वां प्रतिबद्धनामि रक्षे मा चल मा चल॥
        </p>
        <span className="rk-devanagari-sub">May this sacred thread protect you always</span>
      </div>

      {/* Action Button: Enabled only after unlocking Diya */}
      <button 
        className={`rk-btn rk-gate-btn ${isDiyaUnlocked ? 'rk-btn-pulse' : 'rk-btn-disabled'}`} 
        disabled={!isDiyaUnlocked}
        onClick={handleBeginCelebration}
      >
        {isDiyaUnlocked ? "Begin Sacred Celebration 🪔" : "Tap Diya Above to Unlock 🪔"}
      </button>
    </motion.div>
  );
}
