/**
 * Web Audio API Speech & Acoustic Synthesizer
 * Provides audible acoustic playback of speech contours (fundamental frequency F0 harmonic carrier)
 * with accurate time tracking, scrubbing, and dual-track comparison.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private startTime = 0;
  private pauseOffset = 0;
  private duration = 18.0;
  private trackMode: 'baseline' | 'participant' = 'participant';
  private timerId: number | null = null;
  private onTimeUpdateCallback: ((time: number) => void) | null = null;
  private onEndedCallback: (() => void) | null = null;

  // Audio nodes
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setTrackMode(mode: 'baseline' | 'participant') {
    this.trackMode = mode;
  }

  public setDuration(d: number) {
    this.duration = d;
  }

  public onTimeUpdate(cb: (time: number) => void) {
    this.onTimeUpdateCallback = cb;
  }

  public onEnded(cb: () => void) {
    this.onEndedCallback = cb;
  }

  public play(fromTime?: number, mode?: 'baseline' | 'participant') {
    this.initContext();
    if (!this.ctx) return;

    if (mode) this.trackMode = mode;
    if (fromTime !== undefined) {
      this.pauseOffset = Math.max(0, Math.min(fromTime, this.duration));
    }

    if (this.isPlaying) {
      this.stopNodes();
    }

    this.isPlaying = true;
    this.startTime = this.ctx.currentTime - this.pauseOffset;

    // Create dual-harmonic speech synthesizer (formant filtered carrier)
    this.osc1 = this.ctx.createOscillator();
    this.osc2 = this.ctx.createOscillator();
    this.gainNode = this.ctx.createGain();
    this.filterNode = this.ctx.createBiquadFilter();

    // Voice-like formant filter
    this.filterNode.type = 'bandpass';
    this.filterNode.frequency.value = this.trackMode === 'baseline' ? 750 : 920;
    this.filterNode.Q.value = 3.5;

    // Fundamental frequency (F0 base)
    const baseFreq = this.trackMode === 'baseline' ? 135 : 160;
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(baseFreq * 2, this.ctx.currentTime);

    // Dynamic pitch modulation to sound vocal
    const now = this.ctx.currentTime;
    for (let i = 0; i < 20; i++) {
      const t = now + i * 0.8;
      const freqDelta = Math.sin(i * 1.3) * (this.trackMode === 'baseline' ? 25 : 45);
      this.osc1.frequency.exponentialRampToValueAtTime(Math.max(80, baseFreq + freqDelta), t);
      this.osc2.frequency.exponentialRampToValueAtTime(Math.max(160, (baseFreq + freqDelta) * 2), t);
    }

    // Soft speech attack envelope
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);

    // Connect graph
    this.osc1.connect(this.filterNode);
    this.osc2.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();

    // Tick interval for UI sync
    this.startTicker();
  }

  private startTicker() {
    if (this.timerId) clearInterval(this.timerId);

    this.timerId = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying) return;
      const current = this.ctx.currentTime - this.startTime;

      if (current >= this.duration) {
        this.pause();
        this.pauseOffset = 0;
        if (this.onTimeUpdateCallback) this.onTimeUpdateCallback(0);
        if (this.onEndedCallback) this.onEndedCallback();
      } else {
        if (this.onTimeUpdateCallback) this.onTimeUpdateCallback(current);
      }
    }, 40);
  }

  private stopNodes() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      try {
        if (this.osc1) {
          this.osc1.stop();
          this.osc1.disconnect();
          this.osc1 = null;
        }
        if (this.osc2) {
          this.osc2.stop();
          this.osc2.disconnect();
          this.osc2 = null;
        }
      } catch {
        // ignore
      }
    }, 50);
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.ctx) {
      this.pauseOffset = Math.min(this.duration, this.ctx.currentTime - this.startTime);
    }
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.stopNodes();
  }

  public seek(seconds: number) {
    const clamped = Math.max(0, Math.min(seconds, this.duration));
    this.pauseOffset = clamped;
    if (this.ctx) {
      this.startTime = this.ctx.currentTime - clamped;
    }
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(clamped);
    }
  }

  public getCurrentTime(): number {
    if (!this.isPlaying || !this.ctx) return this.pauseOffset;
    return Math.min(this.duration, this.ctx.currentTime - this.startTime);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const speechAudio = new AudioSynthesizer();
