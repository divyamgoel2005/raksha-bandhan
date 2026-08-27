import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect } from '../audio/synth';

export default function RitualsStep({ receiverName = "Muskan", brotherName = "Divyam", onComplete }) {
  const [diyaLit, setDiyaLit] = useState(false);
  const [tilakApplied, setTilakApplied] = useState(false);

  const completedCount = (diyaLit ? 1 : 0) + (tilakApplied ? 1 : 0);
  const allComplete = completedCount === 2;

  const handleDiya = () => {
    if (!diyaLit) {
      setDiyaLit(true);
      playSoundEffect('aarti');
      playSoundEffect('bell');
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleTilak = () => {
    if (!tilakApplied) {
      setTilakApplied(true);
      playSoundEffect('flute');
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleContinue = () => {
    playSoundEffect('shankh');
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
      <div className="rk-badge">Step 1 of 7 • Sacred Pooja</div>
      <h2 className="rk-title">Sacred Rakhi Rituals 🪔</h2>
      <p className="rk-subtitle">
        Perform the traditional preparatory blessings for <strong>{brotherName}</strong> before tying the Rakhi.
      </p>

      {/* Progress pill */}
      <div className="rk-ritual-progress-wrap">
        <div className="rk-ritual-progress-bar" style={{ width: `${(completedCount / 2) * 100}%` }} />
        <span className="rk-ritual-progress-text">{completedCount} of 2 Rituals Performed</span>
      </div>

      {/* 2 Ritual Cards Grid */}
      <div className="rk-rituals-grid two-cards">
        {/* Card 1: Diya & Aarti */}
        <div 
          className={`rk-ritual-card ${diyaLit ? 'completed' : 'pending'}`}
          onClick={handleDiya}
          role="button"
          tabIndex={0}
        >
          <div className="rk-ritual-card-header">
            <span className="rk-ritual-step-num">1</span>
            <span className="rk-ritual-status-icon">
              {diyaLit ? <Check size={16} /> : <Sparkles size={14} />}
            </span>
          </div>

          <div className="rk-ritual-visual">
            <div className="rk-mini-diya-unit">
              <div className={`rk-diya-flame-wrap ${diyaLit ? 'active' : 'unlit'}`}>
                <div className="flame-glow" />
                <div className="flame-body" />
              </div>
              <div className="rk-mini-diya-bowl" />
            </div>
          </div>

          <div className="rk-ritual-info">
            <h3 className="rk-ritual-name">Aarti & Sacred Flame</h3>
            <p className="rk-ritual-desc">
              {diyaLit ? `Holy light ignited for ${brotherName}'s prosperity ✨` : `Tap to light the sacred Diya for ${brotherName}`}
            </p>
          </div>
          
          <button className={`rk-mini-action-btn ${diyaLit ? 'done' : ''}`}>
            {diyaLit ? '✓ Diya Lit' : 'Light Diya 🪔'}
          </button>
        </div>

        {/* Card 2: Tilak & Akshat */}
        <div 
          className={`rk-ritual-card ${tilakApplied ? 'completed' : 'pending'}`}
          onClick={handleTilak}
          role="button"
          tabIndex={0}
        >
          <div className="rk-ritual-card-header">
            <span className="rk-ritual-step-num">2</span>
            <span className="rk-ritual-status-icon">
              {tilakApplied ? <Check size={16} /> : <Sparkles size={14} />}
            </span>
          </div>

          <div className="rk-ritual-visual">
            <div className={`rk-tilak-symbol ${tilakApplied ? 'glowing' : ''}`}>
              <div className="tilak-red-dot" />
              <div className="tilak-rice-grains">
                <span className="grain" />
                <span className="grain" />
                <span className="grain" />
              </div>
            </div>
          </div>

          <div className="rk-ritual-info">
            <h3 className="rk-ritual-name">Roli & Akshat Tilak</h3>
            <p className="rk-ritual-desc">
              {tilakApplied ? `Auspicious vermilion & rice applied on ${brotherName}'s forehead 🔴` : `Tap to apply Tilak on ${brotherName}`}
            </p>
          </div>

          <button className={`rk-mini-action-btn ${tilakApplied ? 'done' : ''}`}>
            {tilakApplied ? '✓ Tilak Applied' : 'Apply Tilak 🔴'}
          </button>
        </div>
      </div>

      {/* Continue CTA */}
      <button 
        className={`rk-btn ${allComplete ? 'rk-btn-pulse' : 'rk-btn-disabled'}`}
        disabled={!allComplete}
        onClick={handleContinue}
      >
        {allComplete ? 'All Rituals Blessed! Choose Rakhi →' : `Complete Both Rituals (${completedCount}/2) →`}
      </button>
    </motion.div>
  );
}
