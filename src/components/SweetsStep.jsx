import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSoundEffect } from '../audio/synth';

const SWEETS = [
  {
    id: 'laddoo',
    name: 'Motichoor Laddoo',
    emoji: '🥮',
    desc: 'Golden saffron pearls made with pure desi ghee',
    reaction: '“So delicious! Thank you Muskan, the sweetest sister ever! ❤️”'
  },
  {
    id: 'kaju',
    name: 'Kaju Katli',
    emoji: '🍬',
    desc: 'Royal silver foil cashew delicacy',
    reaction: '“My absolute favorite! You always know what I love, Muskan! ✨”'
  },
  {
    id: 'jamun',
    name: 'Gulab Jamun',
    emoji: '🍮',
    desc: 'Soft melt-in-mouth syrup confection',
    reaction: '“Warm sweetness wrapped in pure sisterly love! 🫶🏻”'
  },
  {
    id: 'milkcake',
    name: 'Milk Cake',
    emoji: '🍰',
    desc: 'Rich, grainy traditional milk fudge delicacy',
    reaction: '“Delicious Milk Cake! Best sister in the world, Muskan! 🪷”'
  }
];

export default function SweetsStep({ receiverName = "Muskan", brotherName = "Divyam", onComplete }) {
  const [offeredIds, setOfferedIds] = useState([]);
  const [activeReaction, setActiveReaction] = useState(null);

  const handleOfferSweet = (sweet) => {
    if (!offeredIds.includes(sweet.id)) {
      playSoundEffect('sweet');
      setOfferedIds((prev) => [...prev, sweet.id]);
      setActiveReaction({ sweetName: sweet.name, text: sweet.reaction });
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#f43f5e', '#ffffff']
      });
    }
  };

  const allOffered = offeredIds.length >= 1;

  const handleContinue = () => {
    playSoundEffect('bell');
    onComplete();
  };

  return (
    <motion.div 
      className="rk-step rk-sweets-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="rk-badge">Step 4 of 7 • Mithai Offering</div>
      <h2 className="rk-title">Offer Celebratory Mithai 🍬</h2>
      <p className="rk-subtitle">
        Now that the sacred Rakhi is tied on {brotherName}'s wrist, feed delicious traditional sweets to <strong>{brotherName}</strong>!
      </p>

      {/* Sweets Thali Visual */}
      <div className="rk-sweets-thali-plate">
        <div className="rk-thali-rim" />
        <div className="rk-thali-center">
          <span className="rk-thali-blessing-text">शुभ रक्षाबंधन</span>
        </div>

        <div className="rk-sweets-grid">
          {SWEETS.map((sweet) => {
            const isOffered = offeredIds.includes(sweet.id);
            return (
              <motion.div
                key={sweet.id}
                className={`rk-sweet-item-card ${isOffered ? 'offered' : ''}`}
                onClick={() => handleOfferSweet(sweet)}
                whileHover={!isOffered ? { scale: 1.05 } : {}}
                role="button"
                tabIndex={0}
              >
                <div className="rk-sweet-icon-wrap">
                  <span className="rk-sweet-emoji">{sweet.emoji}</span>
                  {isOffered && (
                    <div className="rk-sweet-check-badge">
                      <Check size={12} />
                    </div>
                  )}
                </div>

                <div className="rk-sweet-meta">
                  <h4 className="rk-sweet-name">{sweet.name}</h4>
                  <p className="rk-sweet-desc">{sweet.desc}</p>
                </div>

                <button className={`rk-sweet-feed-btn ${isOffered ? 'done' : ''}`}>
                  {isOffered ? '✓ Sweet Fed' : `Feed ${brotherName} 🍬`}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Divyam's Reaction Box */}
      <AnimatePresence>
        {activeReaction && (
          <motion.div 
            className="rk-brother-reaction-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="reaction-avatar">
              <span>👦🏻</span>
              <Heart size={14} className="reaction-heart" />
            </div>
            <div className="reaction-content">
              <span className="reaction-author">{brotherName} says:</span>
              <p className="reaction-quote">{activeReaction.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue CTA */}
      <button 
        className={`rk-btn ${allOffered ? 'rk-btn-pulse' : 'rk-btn-disabled'}`}
        disabled={!allOffered}
        onClick={handleContinue}
      >
        {offeredIds.length === SWEETS.length 
          ? 'All Sweets Fed with Love! View Memories 📸 →'
          : allOffered
          ? `View Cherished Memories (${offeredIds.length}/${SWEETS.length} Fed) →`
          : `Feed a Sweet to ${brotherName} to Continue 🍬`}
      </button>
    </motion.div>
  );
}
