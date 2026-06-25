// Web Audio API Sound Utility for UI interactions

let audioCtx = null;

// Initialize context lazily on first valid play to comply with browser autoplay policies
const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }
  return audioCtx;
};

// Play synthesized tone
export const playSound = (type) => {
  try {
    // 1. Check setting
    const soundEnabled = localStorage.getItem("cyberdeck-sound-effects") === "true";
    if (!soundEnabled) return;

    // 2. Get context
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Resume context if suspended
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Default volume very low
    const masterVol = 0.05;

    switch (type) {
      case "click":
        // Short, soft digital tick
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
        gain.gain.setValueAtTime(masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.start(t);
        osc.stop(t + 0.05);
        break;

      case "open":
        // Slightly rising tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(300, t);
        osc.frequency.exponentialRampToValueAtTime(600, t + 0.1);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(masterVol * 1.5, t + 0.05);
        gain.gain.linearRampToValueAtTime(0, t + 0.15);
        osc.start(t);
        osc.stop(t + 0.15);
        break;

      case "close":
        // Slightly falling tone
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.1);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(masterVol * 1.5, t + 0.05);
        gain.gain.linearRampToValueAtTime(0, t + 0.15);
        osc.start(t);
        osc.stop(t + 0.15);
        break;

      case "select":
        // Sharper confirmation blip
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);
        gain.gain.setValueAtTime(masterVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
        break;

      case "success":
        // Two-note confirmation
        osc.type = "sine";
        osc.frequency.setValueAtTime(500, t);
        osc.frequency.setValueAtTime(800, t + 0.1);
        
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(masterVol * 2, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        
        gain.gain.setValueAtTime(0, t + 0.1);
        gain.gain.linearRampToValueAtTime(masterVol * 2, t + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        
        osc.start(t);
        osc.stop(t + 0.3);
        break;

      case "toggle":
        // Switch-like digital pulse
        osc.type = "square";
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.setValueAtTime(200, t + 0.05);
        gain.gain.setValueAtTime(masterVol * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
        break;

      default:
        break;
    }
  } catch (e) {
    // Fail silently
    console.warn("Sound play failed", e);
  }
};
