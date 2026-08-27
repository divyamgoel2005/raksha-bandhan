import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { playSoundEffect } from '../audio/synth';

export default function LetterStep({ receiverName = "Muskan", senderName = "Divyam", message }) {
  useEffect(() => {
    // Festive celebratory sound & confetti upon reaching the letter
    playSoundEffect('shankh');
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#f59e0b', '#dc2626', '#ec4899', '#ffffff']
    });
  }, []);

  return (
    <motion.div 
      className="rk-step rk-letter-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="rk-badge">
        <span>🪷</span> Sacred Raksha Bandhan <span>🪷</span>
      </div>
      <h2 className="rk-title">A Brother's Letter of Love 📜</h2>
      <p className="rk-subtitle">
        Words written straight from the heart for <strong>{receiverName}</strong>.
      </p>

      {/* Royal Scroll Parchment */}
      <div className="rk-scroll">
        <div className="rk-scroll-corner tl" />
        <div className="rk-scroll-corner tr" />
        <div className="rk-scroll-corner bl" />
        <div className="rk-scroll-corner br" />

        <div className="rk-scroll-header">
          Dear {receiverName},
        </div>

        <div className="rk-scroll-body">
          {message.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="rk-scroll-line" style={{ animationDelay: `${0.15 * (pIdx + 1)}s` }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="rk-scroll-signature">
          With love & lifelong protection,<br />
          <strong>Yours {senderName}</strong> 🫶🏻
        </div>

        <div className="rk-wax-seal" title="Sacred Seal">
          <span>🪷</span>
        </div>
      </div>
    </motion.div>
  );
}
