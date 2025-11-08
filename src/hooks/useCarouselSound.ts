import { useRef, useCallback } from 'react';

export const useCarouselSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playWhooshSound = useCallback(() => {
    const audioContext = initAudioContext();
    
    // Create oscillator for the whoosh effect
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // Configure filter for a swoosh effect
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
    
    // Configure oscillator
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    
    // Configure gain envelope for fade in/out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Play sound
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }, [initAudioContext]);

  const playClickSound = useCallback(() => {
    const audioContext = initAudioContext();
    
    // Create a short click sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  }, [initAudioContext]);

  return { playWhooshSound, playClickSound };
};
