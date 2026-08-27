import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Grid, Film, ArrowDown, ArrowUp } from 'lucide-react';
import { playSoundEffect } from '../audio/synth';

export default function MemoriesStep({ photos = [], receiverName = "Muskan", senderName = "Divyam", onComplete }) {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState({});
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry' | 'polaroid'
  const bigPhotoRef = useRef(null);
  const galleryTopRef = useRef(null);

  // Keyboard navigation when focusing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIdx((prev) => (prev + 1) % photos.length);
        playSoundEffect('unwrap');
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
        playSoundEffect('unwrap');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photos.length]);

  const handlePhotoClick = (idx) => {
    setSelectedPhotoIdx(idx);
    playSoundEffect('sweet');
    // Smoothly scroll down to the big size photo
    setTimeout(() => {
      bigPhotoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const nextPhoto = () => {
    setSelectedPhotoIdx((prev) => (prev + 1) % photos.length);
    playSoundEffect('unwrap');
  };

  const prevPhoto = () => {
    setSelectedPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
    playSoundEffect('unwrap');
  };

  const toggleLike = (e, idx) => {
    e?.stopPropagation();
    playSoundEffect('sweet');
    setLikedPhotos((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const scrollToTop = () => {
    galleryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContinue = () => {
    playSoundEffect('bell');
    onComplete();
  };

  const currentPhoto = photos[selectedPhotoIdx] || photos[0];
  const isCurrentLiked = likedPhotos[selectedPhotoIdx];

  return (
    <motion.div 
      ref={galleryTopRef}
      className="rk-step rk-gallery-step wide-gallery"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="rk-badge">Step 5 of 7 • Sacred Memories ({photos.length})</div>
      <h2 className="rk-title">Precious Memories Gallery 📸</h2>
      <p className="rk-subtitle">
        Every picture captures a timeless bond between <strong>{senderName}</strong> & <strong>{receiverName}</strong>. Tap any photo to scroll down and view it in big size!
      </p>

      {/* Gallery Controls Bar */}
      <div className="rk-gallery-toolbar">
        <span className="rk-photos-count-badge">
          <Sparkles size={14} /> {photos.length} Cherished Memories
        </span>
        <div className="rk-gallery-toggle-btns">
          <button 
            className={`rk-toolbar-btn ${viewMode === 'masonry' ? 'active' : ''}`}
            onClick={() => setViewMode('masonry')}
            title="Grid Gallery View"
          >
            <Grid size={14} /> Grid
          </button>
          <button 
            className={`rk-toolbar-btn ${viewMode === 'polaroid' ? 'active' : ''}`}
            onClick={() => setViewMode('polaroid')}
            title="Polaroid Showcase View"
          >
            <Film size={14} /> Polaroids
          </button>
        </div>
      </div>

      {/* Main Responsive Memories Grid / Wall */}
      <div className={`rk-memories-showcase-container ${viewMode}`}>
        {photos.map((photo, idx) => {
          const isSelected = selectedPhotoIdx === idx;
          const isLiked = likedPhotos[idx];
          const rot = viewMode === 'polaroid' ? (idx % 2 === 0 ? -1 : 1) * (2 + (idx * 3) % 6) : 0;

          return (
            <motion.div
              key={idx}
              className={`rk-memory-card-wrap ${isSelected ? 'is-selected-card' : ''}`}
              style={{ transform: `rotate(${rot}deg)` }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 5 }}
              onClick={() => handlePhotoClick(idx)}
              role="button"
              tabIndex={0}
            >
              <div className={`rk-memory-card ${isSelected ? 'active-border' : ''}`}>
                {/* Photo Number Tag */}
                <div className="rk-memory-tag">#{idx + 1}</div>

                {/* Selected Indicator */}
                {isSelected && (
                  <div className="rk-viewing-badge">
                    <ArrowDown size={12} /> Viewing Big
                  </div>
                )}

                {/* Photo Image Frame */}
                <div className="rk-memory-img-frame">
                  <img 
                    src={photo.url} 
                    alt={`Memory ${idx + 1}`} 
                    className="rk-memory-img"
                    loading="lazy"
                  />
                  <div className="rk-memory-hover-overlay">
                    <ArrowDown size={20} className="hover-expand-icon" />
                    <span>View Big Size</span>
                  </div>
                </div>

                {/* Caption & Heart Action */}
                <div className="rk-memory-footer">
                  <span className="rk-memory-caption-text">{photo.caption}</span>
                  <button 
                    className={`rk-memory-heart-btn ${isLiked ? 'liked' : ''}`}
                    onClick={(e) => toggleLike(e, idx)}
                    aria-label="Like photo"
                  >
                    <Heart size={15} fill={isLiked ? "#ef4444" : "none"} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dedicated Big Size Featured Photo View (Scroll Target) */}
      <div ref={bigPhotoRef} className="rk-big-photo-section">
        <div className="rk-big-photo-header">
          <div className="rk-big-counter-badge">
            <Sparkles size={16} />
            <span>Featured Memory #{selectedPhotoIdx + 1} of {photos.length}</span>
          </div>
          <button className="rk-scroll-top-btn" onClick={scrollToTop} title="Back to gallery top">
            <ArrowUp size={14} /> Back to Gallery
          </button>
        </div>

        {/* Big Size Photo Stage Container */}
        <div className="rk-big-photo-stage">
          {/* Previous Arrow */}
          <button className="rk-big-nav-btn prev" onClick={prevPhoto} aria-label="Previous photo">
            <ChevronLeft size={32} />
          </button>

          {/* Large Image Frame */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedPhotoIdx}
              className="rk-big-image-frame"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <img 
                src={currentPhoto.url} 
                alt={currentPhoto.caption} 
                className="rk-big-img-display"
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Arrow */}
          <button className="rk-big-nav-btn next" onClick={nextPhoto} aria-label="Next photo">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Big Photo Footer: Caption & Reaction */}
        <div className="rk-big-photo-footer">
          <div className="rk-big-caption-wrap">
            <p className="rk-big-caption-text">{currentPhoto.caption}</p>
            <span className="rk-big-hint">💡 Tip: Use Left / Right arrow keys or tap thumbnails below</span>
          </div>

          <button 
            className={`rk-big-like-btn ${isCurrentLiked ? 'liked' : ''}`}
            onClick={(e) => toggleLike(e, selectedPhotoIdx)}
          >
            <Heart size={20} fill={isCurrentLiked ? "#ef4444" : "none"} />
            <span>{isCurrentLiked ? "Loved ❤️" : "Love this Memory"}</span>
          </button>
        </div>

        {/* Bottom Thumbnail Filmstrip */}
        <div className="rk-big-filmstrip-row">
          {photos.map((p, tIdx) => (
            <div
              key={tIdx}
              className={`rk-filmstrip-item ${tIdx === selectedPhotoIdx ? 'active' : ''}`}
              onClick={() => {
                setSelectedPhotoIdx(tIdx);
                playSoundEffect('sweet');
              }}
            >
              <img src={p.url} alt={`Thumbnail ${tIdx + 1}`} loading="lazy" />
              <span className="filmstrip-tag">#{tIdx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue CTA */}
      <button className="rk-btn rk-btn-pulse" onClick={handleContinue}>
        Read Brother's Letter of Blessings 📜 →
      </button>
    </motion.div>
  );
}
