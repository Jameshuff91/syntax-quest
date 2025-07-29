// Sound Manager for Syntax Quest
// Uses Web Audio API for synthesized sounds

interface SoundOptions {
  volume?: number;
  pitch?: number;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize audio context on first user interaction
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('soundEnabled') !== 'false';
    }
  }

  private initAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  toggleSound(enabled?: boolean) {
    this.enabled = enabled !== undefined ? enabled : !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', String(this.enabled));
    }
  }

  isEnabled() {
    return this.enabled;
  }

  // Play a synthesized success sound
  playSuccess() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const duration = 0.3;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Create a pleasant ascending arpeggio
    const now = this.audioContext.currentTime;
    oscillator.frequency.setValueAtTime(523.25, now); // C5
    oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

    oscillator.type = 'sine';
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  // Play a click sound for UI interactions
  playClick() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const duration = 0.05;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.type = 'sine';
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play an error/failure sound
  playError() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const duration = 0.3;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Descending tone
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + duration);
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.type = 'sawtooth';
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play achievement unlock sound
  playAchievement() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const duration = 0.5;

    notes.forEach((frequency, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      const startTime = this.audioContext!.currentTime + (index * 0.1);
      oscillator.frequency.setValueAtTime(frequency, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.type = 'sine';
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });
  }

  // Play level up sound
  playLevelUp() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    // Create a more complex, celebratory sound
    const duration = 0.8;
    const now = this.audioContext.currentTime;

    // Main melody
    const frequencies = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      
      const startTime = now + i * 0.15;
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration - i * 0.1);
      
      osc.type = 'triangle';
      osc.start(startTime);
      osc.stop(startTime + duration - i * 0.1);
    });

    // Add some harmonics for richness
    const harmonic = this.audioContext.createOscillator();
    const harmonicGain = this.audioContext.createGain();
    
    harmonic.connect(harmonicGain);
    harmonicGain.connect(this.audioContext.destination);
    
    harmonic.frequency.setValueAtTime(523.25 * 2, now); // C6
    harmonicGain.gain.setValueAtTime(0.05, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    harmonic.type = 'sine';
    harmonic.start(now);
    harmonic.stop(now + duration);
  }

  // Play a typing/coding sound
  playType() {
    if (!this.enabled) return;
    this.initAudioContext();
    if (!this.audioContext) return;

    const duration = 0.02;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Random frequency for variety
    oscillator.frequency.setValueAtTime(
      4000 + Math.random() * 2000, 
      this.audioContext.currentTime
    );
    
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.type = 'square';
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

// Export singleton instance
export const soundManager = new SoundManager();