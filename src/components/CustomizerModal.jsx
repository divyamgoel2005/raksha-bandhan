import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { playSoundEffect } from '../audio/synth';

export default function CustomizerModal({ isOpen, onClose, onSave, currentKeepsake }) {
  const [receiverName, setReceiverName] = useState(currentKeepsake.receiverName);
  const [senderName, setSenderName] = useState(currentKeepsake.senderName);
  const [message, setMessage] = useState(currentKeepsake.message);
  const [photos, setPhotos] = useState(currentKeepsake.photos || []);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  if (!isOpen) return null;

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotos([...photos, { url: newPhotoUrl.trim(), caption: "Precious memory ❤️" }]);
      setNewPhotoUrl('');
      playSoundEffect('sweet');
    }
  };

  const handleRemovePhoto = (idx) => {
    setPhotos(photos.filter((_, i) => i !== idx));
    playSoundEffect('unwrap');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPhotos([...photos, { url: reader.result, caption: file.name.split('.')[0] }]);
          playSoundEffect('sweet');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playSoundEffect('shankh');
    onSave({
      ...currentKeepsake,
      receiverName: receiverName.trim() || 'Divyam',
      senderName: senderName.trim() || 'Muskan',
      message: message.trim(),
      photos: photos.length > 0 ? photos : currentKeepsake.photos
    });
    onClose();
  };

  return (
    <div className="rk-lightbox-overlay" onClick={onClose}>
      <motion.div 
        className="rk-customizer-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="customizer-header">
          <div className="customizer-title-wrap">
            <Sparkles size={20} className="sparkle-icon" />
            <h3>Create Custom Rakhi Keepsake</h3>
          </div>
          <button className="rk-lightbox-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="customizer-form">
          <div className="form-group-row">
            <div className="form-group">
              <label>Sister's Name (Recipient)</label>
              <input 
                type="text" 
                value={receiverName} 
                onChange={(e) => setReceiverName(e.target.value)}
                placeholder="e.g. Musu Didi"
                required
              />
            </div>
            <div className="form-group">
              <label>Brother's Name (Sender)</label>
              <input 
                type="text" 
                value={senderName} 
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Divyam"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Heartfelt Letter / Message</label>
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your special blessings and heartfelt message..."
              required
            />
          </div>

          <div className="form-group">
            <label>Photos / Memories ({photos.length})</label>
            <div className="photo-input-row">
              <input 
                type="url" 
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="Paste image link URL..."
              />
              <button type="button" className="photo-add-btn" onClick={handleAddPhoto}>
                <Plus size={16} /> Add
              </button>
              <label className="photo-upload-label" title="Upload local image">
                <ImageIcon size={16} /> Upload
                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
            </div>

            <div className="customizer-photos-preview">
              {photos.map((p, idx) => (
                <div key={idx} className="preview-thumb-wrap">
                  <img src={p.url} alt={`Preview ${idx + 1}`} />
                  <button 
                    type="button" 
                    className="remove-thumb-btn" 
                    onClick={() => handleRemovePhoto(idx)}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="customizer-actions">
            <button type="button" className="rk-btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="rk-btn">
              Generate My Keepsake ✨
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
