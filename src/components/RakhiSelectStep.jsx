import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { RAKHI_DESIGNS } from '../data/defaultKeepsake';
import { playSoundEffect } from '../audio/synth';

export default function RakhiSelectStep({ receiverName = "Muskan", brotherName = "Divyam", selectedRakhi, onSelectRakhi, onComplete }) {
  const handleSelect = (rakhi) => {
    playSoundEffect('unwrap');
    onSelectRakhi(rakhi);
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
      <div className="rk-badge">Step 2 of 7 • Choose Rakhi</div>
      <h2 className="rk-title">Select Sacred Rakhi 🪷</h2>
      <p className="rk-subtitle">
        Pick the handcrafted Rakhi design you want to tie on <strong>{brotherName}</strong>'s wrist.
      </p>

      {/* Rakhis Grid */}
      <div className="rk-rakhi-selection-grid">
        {RAKHI_DESIGNS.map((rakhi) => {
          const isSelected = selectedRakhi.id === rakhi.id;
          return (
            <div
              key={rakhi.id}
              className={`rk-rakhi-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(rakhi)}
              role="button"
              tabIndex={0}
            >
              {isSelected && (
                <div className="rk-rakhi-selected-badge">
                  <Check size={14} /> Selected
                </div>
              )}

              {/* Rakhi Visual Art */}
              <div className="rk-rakhi-art-frame">
                <div className="rakhi-thread-horizontal" />
                <div className="rakhi-center-emblem" style={{ borderColor: rakhi.colors[1] }}>
                  <span className="rakhi-emoji">{rakhi.icon}</span>
                </div>
              </div>

              <div className="rk-rakhi-meta">
                <h3 className="rk-rakhi-name">{rakhi.label}</h3>
                <p className="rk-rakhi-desc">{rakhi.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="rk-btn" onClick={handleContinue}>
        Tie {selectedRakhi.label} on {brotherName}'s Wrist →
      </button>
    </motion.div>
  );
}
