/**
 * Advanced Human Vocal & Speech Synthesizer for GBS Educational Consultancy
 * Features: High-fidelity Neural Voice selection, Phonetic Smoothing, Natural Human Cadence & Prosody
 */

let audioCtx: AudioContext | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices immediately and listen for voice load events
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  const loadVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a pleasant, subtle notification chime
 */
export function playChimeSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Pleasant two-tone chime
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.32);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1174.66, now + 0.07); // D6
    gain2.gain.setValueAtTime(0.10, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.40);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.40);
  } catch (e) {
    console.warn("Audio chime play error:", e);
  }
}

/**
 * Phonetic smoother that transforms visa codes, abbreviations, and symbols
 * into natural, warm human speech patterns.
 */
export function phoneticHumanSmoothing(text: string): string {
  if (!text) return "";

  return text
    // Expand Visa categories naturally
    .replace(/\bD-4-7\b/gi, "D four seven")
    .replace(/\bD-4-1\b/gi, "D four one")
    .replace(/\bD-4\b/gi, "D four")
    .replace(/\bD-2-1\b/gi, "D two one")
    .replace(/\bD-2-2\b/gi, "D two two")
    .replace(/\bD-2\b/gi, "D two")
    .replace(/\bD-10\b/gi, "D ten")
    .replace(/\bE-7\b/gi, "E seven")
    .replace(/\bF-2-7\b/gi, "F two seven")
    .replace(/\bS-3\b/gi, "S three")
    // Expand Consultancy & Education terms
    .replace(/\bGBS\b/g, "G B S")
    .replace(/\bKIEC\b/g, "G B S")
    .replace(/\bSOP\b/g, "S O P")
    .replace(/\bGPA\b/g, "G P A")
    .replace(/\bARC\b/g, "Alien Registration Card")
    .replace(/\bNHIS\b/g, "National Health Insurance")
    .replace(/\bNIIED\b/g, "N I I E D")
    .replace(/\bSLC\b/g, "S L C")
    .replace(/\bSEE\b/g, "S E E")
    .replace(/\+2\b/g, "Plus Two")
    .replace(/\bKRW\b/gi, "Korean Won")
    .replace(/\bNPR\b/gi, "Nepali Rupees")
    .replace(/\bvs\.?\b/gi, "versus")
    .replace(/\bw\//gi, "with ")
    .replace(/\bw\/o\b/gi, "without ")
    .replace(/\bapprox\.?\b/gi, "approximately ")
    .replace(/\betc\.?\b/gi, "and so forth");
}

/**
 * Robust text cleaner that completely removes all emojis, icons, and special symbols
 * so the speech synthesizer only speaks pure natural sentences.
 */
export function cleanTextForSpeech(rawText: string): string {
  if (!rawText) return "";

  const stripped = rawText
    // 1. Remove all Unicode Extended Pictographs / Emojis (🎉, 📚, 🎯, 🎓, ✈️, 🇰🇷, ❤️, ✨, 🌸, 🚀, etc.)
    .replace(/\p{Extended_Pictographic}/gu, "")
    // 2. Remove regional indicator symbols (flags like 🇰🇷, 🇳🇵, 🇺🇸)
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
    // 3. Remove miscellaneous symbols, dingbats, transport, enclosed characters
    .replace(/[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FB}\u{25FC}\u{200D}\u{FE0F}]/gu, "")
    // 4. Remove markdown / UI noise
    .replace(/[#*_`~|•►▶✓✔✅❌📌📢💡🔥👉🔗★☆]/g, " ")
    // 5. Replace multiple dashes or underscores
    .replace(/[-_/]{2,}/g, " ")
    // 6. Normalize spacing
    .replace(/\s+/g, " ")
    .trim();

  // Apply phonetic smoothing for human vocalization
  return phoneticHumanSmoothing(stripped);
}

/**
 * Searches for the highest-fidelity, most natural human voice available in the client browser
 */
function getBestHumanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. High-priority Tier: Natural Neural Cloud voices (Microsoft / Google Neural)
  const naturalNeural = voices.find((v) =>
    v.lang.startsWith("en") &&
    (v.name.includes("Natural") ||
     v.name.includes("Online (Natural)") ||
     v.name.includes("Neural") ||
     v.name.includes("Studio"))
  );
  if (naturalNeural) return naturalNeural;

  // 2. High-priority Tier: Premium Apple / Google Voices
  const premiumVoice = voices.find((v) =>
    v.lang.startsWith("en") &&
    (v.name.includes("Google US English") ||
     v.name.includes("Google UK English Female") ||
     v.name.includes("Samantha (Enhanced)") ||
     v.name.includes("Karen (Premium)") ||
     v.name.includes("Serena") ||
     v.name.includes("Ava") ||
     v.name.includes("Daniel") ||
     v.name.includes("Samantha") ||
     v.name.includes("Alex"))
  );
  if (premiumVoice) return premiumVoice;

  // 3. Fallback: Any English US or GB Voice
  const enVoice = voices.find((v) => v.lang.startsWith("en-US") || v.lang.startsWith("en-GB") || v.lang.startsWith("en"));
  return enVoice || voices[0] || null;
}

/**
 * Speaks the text aloud using advanced human prosody, natural phrasing, and high-fidelity vocal delivery
 */
export function speakPostTitle(title: string, onEnd?: () => void): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    // Play subtle chime first
    playChimeSound();

    // Cancel any previous active utterances
    window.speechSynthesis.cancel();

    // Clean and phonetically smooth text
    const cleanText = cleanTextForSpeech(title);

    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Human vocal prosody parameters
    utterance.rate = 0.91; // Relaxed, clear human speaking pace (not robotic or rushed)
    utterance.pitch = 1.0; // Natural balanced pitch (warm human timbre)
    utterance.volume = 1.0; // Full crisp audio
    utterance.lang = "en-US";

    const humanVoice = getBestHumanVoice();
    if (humanVoice) {
      utterance.voice = humanVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    // Small delay after chime to let human voice breathe naturally
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 140);
  } catch (e) {
    console.warn("Speech synthesis error:", e);
    if (onEnd) onEnd();
  }
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
