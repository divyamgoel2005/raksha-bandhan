import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DEFAULT_KEEPSAKE, RAKHI_DESIGNS } from './data/defaultKeepsake';
import { playDrone, stopDrone, subscribeAudioState } from './audio/synth';
import BackgroundEffects from './components/BackgroundEffects';
import Navbar from './components/Navbar';
import GateScreen from './components/GateScreen';
import RitualsStep from './components/RitualsStep';
import RakhiSelectStep from './components/RakhiSelectStep';
import RakhiTyingStep from './components/RakhiTyingStep';
import SweetsStep from './components/SweetsStep';
import MemoriesStep from './components/MemoriesStep';
import LetterStep from './components/LetterStep';
import CustomizerModal from './components/CustomizerModal';

export default function App() {
  const [keepsake, setKeepsake] = useState(DEFAULT_KEEPSAKE);
  const [currentStep, setCurrentStep] = useState('gate');
  const [selectedRakhi, setSelectedRakhi] = useState(RAKHI_DESIGNS[0]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Sync state with real audio playback
  useEffect(() => {
    const unsubscribe = subscribeAudioState((playing) => {
      setIsMusicPlaying(playing);
    });
    return unsubscribe;
  }, []);

  // Check URL parameters and automatically start audio on page load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      const msg = params.get('msg');
      if (to || from || msg) {
        setKeepsake((prev) => ({
          ...prev,
          receiverName: to || prev.receiverName,
          senderName: from || prev.senderName,
          message: msg || prev.message
        }));
      }
    } catch {}

    // Immediately trigger playback on load
    playDrone();

    // In case browser policy waits for any user gesture, trigger on first interaction
    const handleGesture = () => {
      playDrone();
    };

    const events = ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown', 'scroll', 'mousemove'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { once: true, capture: true, passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGesture, true);
      });
    };
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopDrone();
      setIsMusicPlaying(false);
    } else {
      playDrone();
      setIsMusicPlaying(true);
    }
  };

  const handleStartExperience = () => {
    if (!isMusicPlaying) {
      playDrone();
      setIsMusicPlaying(true);
    }
    setCurrentStep('rituals');
  };

  const handleReplay = () => {
    setCurrentStep('gate');
  };

  const handleStepNavigation = (stepId) => {
    if (stepId !== 'gate' && !isMusicPlaying) {
      playDrone();
      setIsMusicPlaying(true);
    }
    setCurrentStep(stepId);
  };

  return (
    <div className="rk-app-root">
      {/* Background Visual and Particle Effects */}
      <BackgroundEffects />

      {/* Top Floating Glass Navigation */}
      <Navbar 
        currentStep={currentStep}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
        onStepClick={handleStepNavigation}
      />

      {/* Main Content Area */}
      <main className="rk-main-content">
        <AnimatePresence mode="wait">
          {currentStep === 'gate' && (
            <GateScreen 
              key="gate" 
              keepsake={keepsake} 
              onStart={handleStartExperience} 
            />
          )}

          {currentStep === 'rituals' && (
            <RitualsStep 
              key="rituals"
              receiverName={keepsake.receiverName}
              brotherName={keepsake.senderName}
              onComplete={() => setCurrentStep('rakhi-select')}
            />
          )}

          {currentStep === 'rakhi-select' && (
            <RakhiSelectStep 
              key="rakhi-select"
              receiverName={keepsake.receiverName}
              brotherName={keepsake.senderName}
              selectedRakhi={selectedRakhi}
              onSelectRakhi={setSelectedRakhi}
              onComplete={() => setCurrentStep('rakhi-tie')}
            />
          )}

          {currentStep === 'rakhi-tie' && (
            <RakhiTyingStep 
              key="rakhi-tie"
              receiverName={keepsake.receiverName}
              brotherName={keepsake.senderName}
              selectedRakhi={selectedRakhi}
              onComplete={() => setCurrentStep('sweets')}
            />
          )}

          {currentStep === 'sweets' && (
            <SweetsStep 
              key="sweets"
              receiverName={keepsake.receiverName}
              brotherName={keepsake.senderName}
              onComplete={() => setCurrentStep('gallery')}
            />
          )}

          {currentStep === 'gallery' && (
            <MemoriesStep 
              key="gallery"
              photos={keepsake.photos}
              receiverName={keepsake.receiverName}
              senderName={keepsake.senderName}
              onComplete={() => setCurrentStep('letter')}
            />
          )}

          {currentStep === 'letter' && (
            <LetterStep 
              key="letter"
              receiverName={keepsake.receiverName}
              senderName={keepsake.senderName}
              message={keepsake.message}
              onReplay={handleReplay}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Customizer Modal */}
      <CustomizerModal 
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        currentKeepsake={keepsake}
        onSave={(updated) => {
          setKeepsake(updated);
          handleReplay();
        }}
      />
    </div>
  );
}
