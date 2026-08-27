import React from 'react';
import MusicToggle from './MusicToggle';

const STEPS = [
  { id: 'gate', label: 'Welcome' },
  { id: 'rituals', label: 'Pooja' },
  { id: 'rakhi-select', label: 'Choose' },
  { id: 'rakhi-tie', label: 'Tie' },
  { id: 'sweets', label: 'Mithai' },
  { id: 'gallery', label: 'Memories' },
  { id: 'letter', label: 'Letter' }
];

export default function Navbar({ currentStep, isMusicPlaying, onToggleMusic, onStepClick }) {
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <header className="rk-navbar">
      <div className="rk-nav-brand">
        <span className="brand-om">🪷</span>
        <span className="brand-text">DIDIIIIIIII!!!!</span>
      </div>

      {/* Step Indicators */}
      <nav className="rk-step-nav" aria-label="Ceremony progress">
        {STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isCompleted = currentIdx > idx;
          return (
            <button
              key={step.id}
              className={`rk-nav-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onStepClick(step.id)}
              title={step.label}
            >
              <span className="step-dot" />
              <span className="step-name">{step.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Music Toggle */}
      <div className="rk-nav-music">
        <MusicToggle isPlaying={isMusicPlaying} onToggle={onToggleMusic} />
      </div>
    </header>
  );
}
