/**
 * Web Audio API synthesizer that models a warm, harmonic Tibetan singing bowl.
 * Creates a complex, soothing chime using a fundamental frequency and key overtones
 * with a soft attack, low-frequency oscillation (vibrato), and long exponential decay.
 */
export function playBowlChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // Warm spiritual fundamental at A3 (220 Hz) with grounding overtones
    const frequencies = [220, 442, 663, 885, 1105];
    const relativeGains = [0.5, 0.25, 0.12, 0.06, 0.02];
    
    // Master gain node to prevent clipping
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.8, now);
    masterGain.connect(ctx.destination);
    
    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      
      // Add a subtle frequency modulation (vibrato) to the fundamental for acoustic realism
      if (idx === 0) {
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(5.5, now); // 5.5 Hz soothing oscillation
        lfoGain.gain.setValueAtTime(2.0, now); // Subtle pitch swing
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 4.5);
      }
      
      // Envelope: Soft attack (50ms) -> Long, natural exponential decay (4.5s)
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(relativeGains[idx], now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 4.5);
      
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      
      osc.start(now);
      osc.stop(now + 4.6);
    });
  } catch (error) {
    console.warn("Web Audio API not supported or blocked by browser autoplay policy:", error);
  }
}
